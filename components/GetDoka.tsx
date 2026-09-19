'use client'

import { useEffect, useState } from 'react'
import { IconBrandApple, IconBrandWindows, IconDownload } from '@tabler/icons-react'
import type { Installer } from '@/lib/release'
import { GhostButton, LeafButton } from '@/components/ui'

/**
 * "Get Doka" — detects the visitor's computer and puts that download first.
 * No word "till": people don't know it. It's "Doka for your computer".
 */
type Os = 'windows' | 'mac-arm' | 'mac-intel' | 'other'

function detect(): Os {
  const ua = navigator.userAgent
  if (/Windows/i.test(ua)) return 'windows'
  if (/Macintosh|Mac OS X/i.test(ua)) {
    // Apple Silicon Macs report as Intel in the UA; WebGL renderer is the reliable tell.
    try {
      const gl = document.createElement('canvas').getContext('webgl')
      const dbg = gl?.getExtension('WEBGL_debug_renderer_info')
      const r = dbg ? String(gl?.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : ''
      if (/Apple M|Apple GPU/i.test(r)) return 'mac-arm'
    } catch { /* fall through */ }
    return 'mac-intel'
  }
  return 'other'
}

export function GetDoka({ installers, version, page }: { installers: Installer[]; version: string; page: string }) {
  const [os, setOs] = useState<Os>('other')
  useEffect(() => setOs(detect()), [])

  const win = installers.find((i) => i.key === 'windows')
  const arm = installers.find((i) => i.key === 'mac-arm')
  const intel = installers.find((i) => i.key === 'mac-intel')
  const mac = os === 'mac-intel' ? intel ?? arm : arm ?? intel
  const primary = os === 'windows' ? win : os.startsWith('mac') ? mac : null
  const secondary = os === 'windows' ? mac : os.startsWith('mac') ? win : null

  const Btn = ({ i, big, kind }: { i: Installer; big?: boolean; kind: 'windows' | 'mac' }) => {
    const label = <>{kind === 'windows' ? <IconBrandWindows size={18} /> : <IconBrandApple size={18} />} Download for {kind === 'windows' ? 'Windows' : 'Mac'}</>
    return big ? <LeafButton href={i.url} size="lg">{label}</LeafButton> : <GhostButton href={i.url} size="lg">{label}</GhostButton>
  }

  if (installers.length === 0) {
    return <LeafButton href={page} size="lg"><IconDownload size={18} /> Get Doka</LeafButton>
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        {primary ? <Btn i={primary} big kind={os === 'windows' ? 'windows' : 'mac'} /> : (
          <>{win && <Btn i={win} big kind="windows" />}{mac && <Btn i={mac} big kind="mac" />}</>
        )}
        {primary && secondary && <Btn i={secondary} kind={os === 'windows' ? 'mac' : 'windows'} />}
      </div>
      <p className="mt-3 text-[13px] text-muted">
        {primary ? `We picked ${os === 'windows' ? 'Windows' : os === 'mac-arm' ? 'Mac (Apple Silicon)' : 'Mac (Intel)'} for this computer. ` : ''}
        {version ? `Version ${version}. ` : ''}
        {os.startsWith('mac') && arm && intel ? (
          <>Other Mac: <a href={(os === 'mac-arm' ? intel : arm)!.url} className="underline">{os === 'mac-arm' ? 'Intel' : 'Apple Silicon'}</a>. </>
        ) : null}
        Installs once, updates itself.
      </p>
      {os.startsWith('mac') && (
        <p className="mt-2 text-[12.5px] text-muted">
          {/* Until the Mac build is signed with Apple, Gatekeeper calls it "damaged". Honest note rather than a surprise. */}
          Mac: if it says “Doka is damaged”, it isn’t — the Mac build is not yet registered with Apple. Open Terminal and run <code className="rounded bg-black/5 px-1">xattr -cr /Applications/Doka.app</code> once, then open it normally.
        </p>
      )}
    </div>
  )
}

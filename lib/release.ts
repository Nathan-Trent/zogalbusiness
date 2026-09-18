/**
 * Latest Doka desktop release, read from GitHub Releases (public API, no
 * key). A new tag updates the download links by itself. Anything missing
 * falls back to the Releases page so the button is never dead.
 */
export interface Installer { label: string; note: string; url: string; size: string | null }

const REPO = 'Nathan-Trent/jakodav2'
const RELEASES = `https://github.com/${REPO}/releases/latest`

export async function fetchLatestRelease(): Promise<{ version: string; installers: Installer[]; page: string }> {
  const empty = { version: '', installers: [] as Installer[], page: RELEASES }
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { headers: { accept: 'application/vnd.github+json' }, next: { revalidate: 600 } })
    if (!res.ok) return empty
    const rel = (await res.json()) as { tag_name: string; html_url: string; assets: { name: string; browser_download_url: string; size: number }[] }
    const mb = (n: number) => `${(n / 1_048_576).toFixed(1)} MB`
    const find = (test: (n: string) => boolean) => rel.assets.find((a) => test(a.name.toLowerCase()))
    const win = find((n) => n.endsWith('-setup.exe'))
    const arm = find((n) => n.endsWith('.dmg') && n.includes('aarch64'))
    const x64 = find((n) => n.endsWith('.dmg') && n.includes('x64'))
    const installers: Installer[] = []
    if (win) installers.push({ label: 'Windows', note: 'Windows 10 or later, 64-bit', url: win.browser_download_url, size: mb(win.size) })
    if (arm) installers.push({ label: 'Mac (Apple Silicon)', note: 'M1, M2, M3, M4', url: arm.browser_download_url, size: mb(arm.size) })
    if (x64) installers.push({ label: 'Mac (Intel)', note: 'Intel-based Macs', url: x64.browser_download_url, size: mb(x64.size) })
    return { version: rel.tag_name.replace(/^v/, ''), installers, page: rel.html_url }
  } catch {
    return empty
  }
}

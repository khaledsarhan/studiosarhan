// Shares a link: the phone's own share sheet where available, otherwise copies the link.
export type ShareResult = 'shared' | 'copied' | 'cancelled' | 'failed';

export async function shareLink(url: string, title: string): Promise<ShareResult> {
  if (navigator.share) {
    try {
      await navigator.share({ title, url });
      return 'shared';
    } catch (e) {
      if ((e as DOMException)?.name === 'AbortError') return 'cancelled';
      // fall through to copying
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    return 'copied';
  } catch {
    return 'failed';
  }
}

/** Shows a short message (e.g. "Link copied") at the bottom of the screen. */
export function toast(message: string, parent: HTMLElement = document.body) {
  const el = document.createElement('div');
  el.className = 'share-toast';
  el.setAttribute('role', 'status');
  el.textContent = message;
  parent.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, 2200);
}

export function resultMessage(r: ShareResult, url: string): string | null {
  if (r === 'copied') return 'Link copied';
  if (r === 'failed') return `Copy this link: ${url}`;
  return null;
}

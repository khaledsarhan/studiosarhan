import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Photo = Project['data']['photos'][number];

/** All published projects, in the order set by their `order` field. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export function countLabel(n: number): string {
  return `${n} photograph${n === 1 ? '' : 's'}`;
}

export type Row =
  | { kind: 'full'; items: { photo: Photo; index: number }[] }
  | { kind: 'pair'; items: { photo: Photo; index: number }[] }
  | { kind: 'single'; items: { photo: Photo; index: number }[] }
  | { kind: 'note'; items: { photo: Photo; index: number }[] };

/**
 * Lays a project's photos out like a photo book:
 * the first photo runs full width, the rest go side by side in pairs,
 * an odd one out sits centred (beside the project's note, if it has one).
 * A photo marked `size: full` always gets its own full-width row.
 */
export function layoutRows(photos: Photo[], hasNote: boolean): Row[] {
  const rows: Row[] = [];
  const queue: { photo: Photo; index: number }[] = [];
  let noteUsed = !hasNote;

  const flush = (final: boolean) => {
    while (queue.length >= 2) rows.push({ kind: 'pair', items: queue.splice(0, 2) });
    if (queue.length === 1 && final) {
      const item = queue.splice(0, 1);
      if (!noteUsed) { rows.push({ kind: 'note', items: item }); noteUsed = true; }
      else rows.push({ kind: 'single', items: item });
    }
  };

  photos.forEach((photo, index) => {
    const full = photo.size === 'full' || (index === 0 && photo.size !== 'half');
    if (full) {
      flush(true);
      rows.push({ kind: 'full', items: [{ photo, index }] });
    } else {
      queue.push({ photo, index });
    }
  });
  flush(true);
  return rows;
}

/** Responsive widths for a photo, never larger than the original file. */
export function widthsFor(img: { width: number }, wanted = [640, 1024, 1600, 2400]): number[] {
  const w = wanted.filter((x) => x < img.width);
  return [...w, Math.min(img.width, wanted[wanted.length - 1])];
}

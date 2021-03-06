const apiUrl = process.env.SAPPER_APP_API_URL;

export async function strapiPreload(page, session) {
  const res = await this.fetch(`${apiUrl}/pages?slug=${encodeURIComponent(page.path)}`);
  const data = await res.json();
  if (res.status !== 200) {
    this.error(res.status, data.message);
  }
  // empty array from strapi results in a 404 page
  if (!data || data.length === 0) {
    this.error(404, 'Page not found');
  }
  return {
    pageData: data.shift(),
  };
}

export async function navPreload(page, session) {
  const res = await this.fetch(`${apiUrl}/navigation`);
  const data = await res.json();
  if (res.status !== 200) {
    this.error(res.status, data.message);
  }
  return {
    navPages: data.Navigation.map((page) => ({
      title: page.title,
      url: page.page.slug,
    })),
  };
}

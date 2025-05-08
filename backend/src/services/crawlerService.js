// crawlerService.js
/**
 * Crawl Reddit for posts related to the given query.
 * It uses the Reddit search JSON endpoint to fetch the top 5 posts.
 *
 * @param {string} query - The query string to search on Reddit.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of post objects.
 */
export const crawl = async (query) => {
    // Construct the search URL with a limit of 5 posts.
    const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&limit=3`;
    try {
      // Fetch the data from Reddit.
      const response = await fetch(url, {
        headers: {
          // Set a User-Agent header.
          'User-Agent': 'Mozilla/5.0 (compatible; RedditSpider/1.0)'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      // Extract posts from the returned JSON. Each post is found under data.children[*].data.
      const posts = json.data.children.map(child => child.data);
      return posts;
    } catch (error) {
      console.error("Error fetching data from Reddit API:", error);
      return [];
    }
  };

export default {
  crawl
};

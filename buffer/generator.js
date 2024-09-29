const getPosts = async ({ skip, limit }) => {
  return fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`)
    .then((res) => res.json())
    .catch((e) => {
      throw e;
    });
};

const postsGenerator = async function* () {
  const PAGE_SIZE = 10;
  let page = 1;

  let hasNextPage = true;

  while (hasNextPage) {
    const skip = (page - 1) * PAGE_SIZE;
    const res = await getPosts({ limit: PAGE_SIZE, skip });

    if (!res.posts.length) {
      hasNextPage = false;
    }

    yield res;
    page++;
  }
};

const postsIterator = postsGenerator();

(async () => {
  while (true) {
    const posts = await postsIterator.next();

    if (posts.done) {
      break;
    }

    console.log(posts);
  }
})();

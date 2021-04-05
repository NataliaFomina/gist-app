export function headers() {
  if (process.env.REACT_APP_GITHUB_TOKEN) {
    return {
      authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
    }
  } else {
    return null;
  }
}
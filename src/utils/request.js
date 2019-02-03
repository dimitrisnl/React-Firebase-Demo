export const normalizeKey = key => {
  return key
    .split('')
    .reduce((results, char) => {
      return char === char.toUpperCase()
        ? results.concat('-', char.toLowerCase())
        : results.concat(char);
    }, [])
    .join('');
};

export const normalizeData = data => {
  return Object.keys(data).reduce((result, key) => {
    result[normalizeKey(key)] = data[key];
    return result;
  }, {});
};

const request = (url, { headers, body, ...options }) =>
  fetch(url, {
    ...options,
    headers: {
      ...headers,
      // 'Content-Type': 'application/json; charset=utf-8',
      // 'X-Requested-With': 'XMLHttpRequest',
    },
    ...{ ...(body ? { body: JSON.stringify(normalizeData(body)) } : {}) },
  }).then(response => {
    return response.json().then(data => {
      if (response.ok) {
        return data;
      }

      return Promise.reject(
        new Error(data.error || 'An error occured. Please try again later.')
      );
    });
  });

export default request;

export const useFetch = async ({ url = '' } = {}) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.error(error);
  } finally {
  }
};

// SoondAPi

export function jsonp(url) {
  return new Promise((resolve, reject) => {
    const cb = 'cb_' + Math.random().toString(36).substr(2, 5);
    const script = document.createElement('script');

    window[cb] = (data) => {
      delete window[cb];
      document.body.removeChild(script);
      resolve(data);
    };

    script.src = `${url}&callback=${cb}`;
    script.onerror = () => {
      delete window[cb];
      document.body.removeChild(script);
      reject(new Error('JSONP error'));
    };

    document.body.appendChild(script);
  });
}

export async function getRandomTrack() {
  const url = 'https://api.deezer.com/search?q=track&limit=50&output=jsonp';
  const data = await jsonp(url);

  if (data.data && data.data.length > 0) {
    return data.data[Math.floor(Math.random() * data.data.length)];
  }
  throw new Error('Не удалось найти трек');
}

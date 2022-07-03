export default class Requests {
  constructor(url) {
    this.url = url;
  }

  async postData(body) {
    const res = await fetch(this.url, {
      method: 'POST',
      body,
    });

    return await res.text();
  }
}

export async function getUserId() {
  try {
    const response = await axios.get('https://back.gosagi.com/user', {
      withCredentials: true,
    });
    return response.data.data[0].id;
  } catch (error) {}
}

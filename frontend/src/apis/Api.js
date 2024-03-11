const BaseUrl = process.env.REACT_APP_API_URL;
console.log('BaseUrl',BaseUrl)
export async function loginApi(userName, password) {
  try {
    const response = await fetch(BaseUrl + 'auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, password }),
    });
    let data;
    try {
      data = await response.json();
      console.log("Response data:", data);
    } catch (jsonError) {
      // Handle JSON parsing error (e.g., if response is not valid JSON)
      console.error('Error parsing JSON:', jsonError);
      data = null;
    }
    if (!response.ok) {
      console.error('API Error:', data);
    }
    return data;
  } catch (error) {
    console.error('Error in loginApi:', error);
    throw error; // Rethrow the error to propagate it further
  }
}

export async function createresource(resourceData, token) {
  console.log('resourceData=====', resourceData,BaseUrl);
  try {
    const response = await fetch(BaseUrl + 'admin/resources/create', {
      method: 'POST',
      headers: {
        'Authorization': "Bearer " +token,
      },
      body: resourceData
    });
    let data;
    try {
      data = await response.json();
      console.log("Response data:", data);
    } catch (jsonError) {
      // Handle JSON parsing error (e.g., if response is not valid JSON)
      console.error('Error parsing JSON:', jsonError);
      data = null;
    }
    if (!response.ok) {
      console.error('API Error:', data);
    }
    return data;
  } catch (error) {
    console.error('Error in createresource:', error);
    throw error; // Rethrow the error to propagate it further
  }
}

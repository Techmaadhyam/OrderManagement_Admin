// api to get country, state, city names

// Fetches the access token
export const fetchAccessToken = async () => {
  try {
    const response = await fetch(
      "https://www.universal-tutorial.com/api/getaccesstoken",
      {
        headers: {
          Accept: "application/json",
          "api-token":
            "8HWETQvEFegKi6tGPUkSWDiQKfW8UdZxPqbzHX6JdShA3YShkrgKuHUbnTMkd11QGkE",
          "user-email": "mithesh.dev.work@gmail.com",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch access token");
    }

    const data = await response.json();
    return data.auth_token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Fetches the countries list
export const fetchCountries = async (accessToken) => {
  try {
    const response = await fetch(
      "https://www.universal-tutorial.com/api/countries/",
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

// Fetches the states list for a given country
export const fetchStates = async (accessToken, country) => {
  try {
    const response = await fetch(
      `https://www.universal-tutorial.com/api/states/${country}`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching states:", error);
    throw error;
  }
};

// Fetches the cities list for a given state
export const fetchCities = async (accessToken, state) => {
  try {
    const response = await fetch(
      `https://www.universal-tutorial.com/api/cities/${state}`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};

// Fetches the states list for India
export const fetchIndianStates = async (accessToken) => {
  try {
    const response = await fetch(
      "https://www.universal-tutorial.com/api/states/India",
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Indian states:", error);
    throw error;
  }
};

const apikey = 'chw8iJyx9dA3IwQOGUqg7h3XINbpiJAu';


const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';

    const query = `?apikey=${apikey}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];

};

const getCondition = async (locationKey) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${locationKey}?apikey=${apikey}`;
    response = await fetch(base + query);
    data = await response.json();
    return data[0];

};




class Forecast{
    constructor(){
        this.apikey = 'chw8iJyx9dA3IwQOGUqg7h3XINbpiJAu';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURI ='http://dataservice.accuweather.com/currentconditions/v1/';
    }
    async updateCity(city){
        const cityDetails = await this.getCity(city);
        const cityWeather = await this.getCondition(cityDetails.Key);
        return {
            cityDetails: cityDetails,
            cityWeather: cityWeather,
        };
    }
    async getCity(city){
        const query = `?apikey=${this.apikey}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    }
    async getCondition(locationKey){
        const query = `${locationKey}?apikey=${this.apikey}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }
}
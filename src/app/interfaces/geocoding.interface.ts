export interface Geocoding {
  place_id:     number;
  licence:      string;
  osm_type:     string;
  osm_id:       number;
  lat:          string;
  lon:          string;
  class:        string;
  type:         string;
  place_rank:   number;
  importance:   number;
  addresstype:  string;
  name:         string;
  display_name: string;
  address:      Address;
  boundingbox:  string[];
}

export interface Address {
  amenity:          string;
  road:             string;
  neighbourhood:    string;
  suburb:           string;
  region:           string;
  "ISO3166-2-lvl6": string;
  city:             string;
  state:            string;
  "ISO3166-2-lvl4": string;
  postcode:         string;
  country:          string;
  country_code:     string;
}

import React from 'react'
import ReactGoogleAutocomplete from 'react-google-autocomplete'

export const AutoCompleteAddress = ({ ...props }) => {
  const options = {
    types: ['address'],
    listViewDisplayed: 'auto',
    componentRestrictions: { country: 'us' },
    fields: ['']
  }

  return <ReactGoogleAutocomplete
    apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
    options={options}
    {...props}
    onPlaceSelected={(selected) => {
      const streetNumberFilter = selected.address_components.filter(item => item.types.includes('street_number'))
      const streetNumber = streetNumberFilter.length ? streetNumberFilter[0].long_name : ''

      const routeFilter = selected.address_components.filter(item => item.types.includes('route'))
      const route = routeFilter.length ? routeFilter[0].long_name : ''

      const address1 = streetNumber + ' ' + route

      const cityFilter = selected.address_components.filter(item => item.types.includes('locality'))
      const city = cityFilter.length ? cityFilter[0].long_name : ''

      const stateFilter = selected.address_components.filter(item => item.types.includes('administrative_area_level_1'))
      const state = stateFilter.length ? stateFilter[0].long_name : ''

      const zipCodeFilter = selected.address_components.filter(item => item.types.includes('postal_code'))
      const zipCode = zipCodeFilter.length ? zipCodeFilter[0].long_name : ''

      const countryFilter = selected.address_components.filter(item => item.types.includes('country'))
      const country = countryFilter.length ? countryFilter[0].long_name : ''

      props.onChange({ target: { value: selected?.formatted_address } }, props.id, { address1, city, state, zipCode, country })
    }}
  />
}

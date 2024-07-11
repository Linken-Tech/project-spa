// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function handleResponse(response) {
    if (response.results) {
        return response.results;
    }

    if (response.data) {
        return response.data;
    }

    return response;
}
  
export function handleError(error) {
    if (error.data) {
        return error.data;
    }
    return error;
}

export function handleVehiclesResponse(response) {
    if (response.results) {
        return response.results;
    }

    if (response.data) {
        response.data.forEach(vehicle => {
            vehicle.vehicle_images.forEach(vehicle_image => {
                if (process.env.REACT_APP_ENVIRONMENT === 'development') {
                    vehicle_image.vehicle_image = `${process.env.REACT_APP_API_BASE_URL}${vehicle_image.vehicle_image}`;
                }
            });
        });
        return response.data; 
    }

    return response;
}

export function handleVehicleByIdResponse(response) {
    if (response.results) {
        return response.results;
    }

    if (response.data) {
        response.data.vehicle_images.forEach(vehicle_image => {
            if (process.env.REACT_APP_ENVIRONMENT === 'development') {
                vehicle_image.vehicle_image = `${process.env.REACT_APP_API_BASE_URL}${vehicle_image.vehicle_image}`;
            }
        });
        return response.data; 
    }

    return response;
}
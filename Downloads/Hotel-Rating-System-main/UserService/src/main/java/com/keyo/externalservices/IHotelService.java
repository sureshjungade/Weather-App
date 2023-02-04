package com.keyo.externalservices;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.keyo.entities.Hotel;

@FeignClient(name = "HOTEL-SERVICE")
public interface IHotelService {
	
	@GetMapping("/hotels/getHotel/{hotelId}")
	Hotel getHotel(@PathVariable String hotelId);
	

}

package coworking.digitalBooking;

import coworking.digitalBooking.Entities.Category;
import coworking.digitalBooking.Entities.Coworking;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DigitalBookingApplication {

	public static void main(String[] args) {
		SpringApplication.run(DigitalBookingApplication.class, args);


		Category cat = new Category("state categori","categori state","categosinimage");
		Coworking cow  = new Coworking("oficina","medellin","aranjuez","cowork 123","no tengo image",cat);
		System.out.println(cow.toString());

	}

}

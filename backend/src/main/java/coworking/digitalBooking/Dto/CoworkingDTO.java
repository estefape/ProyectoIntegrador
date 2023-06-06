package coworking.digitalBooking.Dto;

import coworking.digitalBooking.Repository.RatingRepository.RatingResult;
import lombok.*;


@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CoworkingDTO {

    private long idCoworking;
    private String name;
    private String city;
    private String address;
    private String description;
    private String image;
    private RatingResult rating;
    private CategoryDTO category;

}
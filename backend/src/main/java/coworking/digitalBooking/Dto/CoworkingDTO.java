package coworking.digitalBooking.Dto;

import coworking.digitalBooking.Entities.Category;
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
    private Category category;

}

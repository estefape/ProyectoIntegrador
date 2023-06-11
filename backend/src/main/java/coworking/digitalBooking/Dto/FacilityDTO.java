package coworking.digitalBooking.Dto;


import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FacilityDTO {

    private long id;
    private String name;
    private String icon;
    private Boolean status;
}

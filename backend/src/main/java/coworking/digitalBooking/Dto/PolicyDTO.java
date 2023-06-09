package coworking.digitalBooking.Dto;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PolicyDTO {

    private Long idPolicy;
    private String name;
    private String description;
    private boolean status;
}

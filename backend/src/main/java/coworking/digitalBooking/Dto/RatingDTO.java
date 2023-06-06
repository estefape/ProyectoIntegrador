package coworking.digitalBooking.Dto;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RatingDTO {

    private Integer id;
    private Integer idCoworking;
    private Integer puntuacion;

    public void setpuntuacion(Integer puntuacion) {
    }

    public void setidCoworking(Integer idCoworking) {
    }
}

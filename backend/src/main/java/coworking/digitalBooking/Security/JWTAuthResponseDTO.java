package coworking.digitalBooking.Security;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JWTAuthResponseDTO {

    private String tokenAccess;
    private String tokenType = "Bearer";


    public JWTAuthResponseDTO(String tokenAccess) {
        this.tokenAccess = tokenAccess;
    }
}

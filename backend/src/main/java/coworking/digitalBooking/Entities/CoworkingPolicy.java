package coworking.digitalBooking.Entities;

import lombok.*;
import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "coworking_policy")
public class CoworkingPolicy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCoworkingPolicy;

    @ManyToOne
    @JoinColumn(name = "coworking_id", nullable = false)
    private Coworking coworking;

    @ManyToOne
    @JoinColumn(name = "policy_id", nullable = false)
    private Policy policy;

    public CoworkingPolicy(Coworking coworking, Policy policy) {
        this.coworking = coworking;
        this.policy = policy;
    }
}

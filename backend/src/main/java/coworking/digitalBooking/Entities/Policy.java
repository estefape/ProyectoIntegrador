package coworking.digitalBooking.Entities;

import lombok.*;
import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "policies")
public class Policy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPolicy;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "state", nullable = false)
    private boolean active;

    public Policy(String name, String description, boolean active) {
        this.name = name;
        this.description = description;
        this.active = active;
    }
}

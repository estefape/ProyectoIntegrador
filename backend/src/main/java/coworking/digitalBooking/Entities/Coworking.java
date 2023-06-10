package coworking.digitalBooking.Entities;

import coworking.digitalBooking.Repository.RatingRepository.RatingResult;
import lombok.*;
import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Coworking",uniqueConstraints = { @UniqueConstraint(columnNames = { "name" })})
public class Coworking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idCoworking;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "address", nullable = false)
    private String address;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "image", nullable = false)
    private String image;

    @Transient
    private RatingResult ratingResult;

    // Se agregan 3 columnas, una para cada política
    @Column(name= "coworking_rules_policy", columnDefinition = "TEXT")
    private String coworkingRulesPolicy;

    @Column(name= "health_safety_policy", columnDefinition = "TEXT")
    private String healthSafetyPolicy;

    @Column(name= "cancellation_policy", columnDefinition = "TEXT")
    private String cancellationPolicy;

    @ManyToOne
    @JoinColumn(name = "idCity")
    private City city;
    @ManyToOne
    @JoinColumn(name = "idCategory")
    private Category category;

/*    @OneToMany(mappedBy = "coworking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CoworkingPolicy> coworkingPolicies;*/


    @Override
    public String toString(){
        return  "Category =  " + category.getName() +
                ", Name Coworking = " + name +
                ", Address = " + address;
    }

}
package coworking.digitalBooking.Entities;

import coworking.digitalBooking.Repository.RatingRepository.RatingResult;
import lombok.*;
import javax.persistence.*;

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

    @ManyToOne
    @JoinColumn(name = "idCity")
    private City city;
    @ManyToOne
    @JoinColumn(name = "idCategory")
    private Category category;



    @Override
    public String toString(){
        return  "Category =  " + category.getName() +
                ", Name Coworking = " + name +
                ", Address = " + address;
    }

}
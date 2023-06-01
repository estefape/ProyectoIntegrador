package coworking.digitalBooking.Entities;

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
    @Column(name = "city", nullable = false)
    private String city;
    @Column(name = "address", nullable = false)
    private String address;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "image", nullable = false)
    private String image;

    @Column(name = "rating", nullable = false)
    private Integer rating;

    @ManyToOne
    @JoinColumn(name = "idCategory")
    private Category category;

    public Coworking(String name, String city, String address, String description, String image, Integer rating, Category category) {
        this.name = name;
        this.city = city;
        this.address = address;
        this.description = description;
        this.image = image;
        this.rating = rating;
        this.category = category;
    }

    @Override
    public String toString(){
        return  "Category =  " + category.getName() +
                ", Name Coworking = " + name +
                ", City = " + city  +
                ", Address = " + address;
    }

}
package coworking.digitalBooking.Entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Coworking {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer idCoworking;
    @Column
    private String name;
    @Column
    private String city;
    @Column
    private String address;
    @Column
    private String description;
    @Column
    private String image;

    @ManyToOne
    @JoinColumn(name = "idCategory")
    private Category category;

    public Coworking(String name, String city, String address, String description, String image, Category category) {
        this.name = name;
        this.city = city;
        this.address = address;
        this.description = description;
        this.image = image;
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

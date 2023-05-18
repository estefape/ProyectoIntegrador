package coworking.digitalBooking.Entities;


import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer idCategory;
    @Column
    private String name;
    @Column
    private String description;
    @Column
    private String image;

    public Category(String name, String description, String image) {
        this.name = name;
        this.description = description;
        this.image = image;
    }

    @Override
    public String toString(){
        return  "Name Category =  " + name +
                ", Description = " + description ;
    }

}

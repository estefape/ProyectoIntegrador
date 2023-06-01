package coworking.digitalBooking.Entities;

import lombok.*;
import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "categories",uniqueConstraints = { @UniqueConstraint(columnNames = { "name" })})
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idCategory;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "image", nullable = false)
    private String image;
    @Column
    final Integer results = 2;

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

    public long getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(Integer idCategory) {
        this.idCategory = idCategory;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
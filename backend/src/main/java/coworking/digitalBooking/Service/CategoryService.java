package coworking.digitalBooking.Service;

import coworking.digitalBooking.Entities.Category;
import coworking.digitalBooking.Entities.Coworking;
import coworking.digitalBooking.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category registerCategory(Category cat){
        return categoryRepository.save(cat);
    }

    public Category update(Category cat){
        return categoryRepository.save(cat);
    }

    public Optional<Category> searchById(Integer id){
        return categoryRepository.findById(id);
    }

    public List<Category> searchAll(){
        return categoryRepository.findAll();
    }

    public void delete(Integer id){
        Optional<Category> categorySearch = searchById(id);
        if(categorySearch.isPresent())
            categoryRepository.deleteById(id);
    }

}

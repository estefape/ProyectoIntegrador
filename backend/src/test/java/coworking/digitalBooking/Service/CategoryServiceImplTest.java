package coworking.digitalBooking.Service;

import coworking.digitalBooking.Dto.CategoryDTO;
import coworking.digitalBooking.Exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@SpringJUnitConfig
@Transactional
class CategoryServiceImplTest {

    @Autowired
    private CategoryService categoryService;

    private CategoryDTO categoryTest;


    @BeforeEach
    void prepareData() {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setName("Categoria de prueba para eliminar");
        categoryDTO.setDescription("Categoria de prueba para eliminar");
        categoryDTO.setImage("imagen.jpg");
        categoryDTO.setResults(2);
        categoryTest = categoryService.registerCategory(categoryDTO);
    }

    @Test
    @Order(1)
    void registerCategory() {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setName("Categoria de prueba del insert");
        categoryDTO.setDescription("Categoria de prueba");
        categoryDTO.setImage("imagen.jpg");
        categoryDTO.setResults(2);

        CategoryDTO categoryTestRegister = categoryService.registerCategory(categoryDTO);
        assertEquals(categoryTestRegister.getName(), categoryDTO.getName());
        assertNotNull(categoryService.searchById(categoryTestRegister.getIdCategory()));
    }

    @Test
    @Order(2)
    void delete() {
        assertNotNull(categoryTest);
        categoryService.delete(categoryTest.getIdCategory());
        assertThrows(ResourceNotFoundException.class, () -> {
            categoryService.searchById(categoryTest.getIdCategory());
        });
    }
}
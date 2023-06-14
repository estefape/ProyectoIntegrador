# Digital Booking 
## Backend 
## Unit Tests
Los tests unitarios en el área de backend se realizaron utilizando el framework Junit. Los tests se realizaron en los siguientes servicios o *services*: Category, City, Coworking y CoworkingFacility. 

### Test unitario: delete() - CategoryService

Este test verifica el comortamiento del método `delete()` en la clase CategoryService al eliminar una categoría. 

**Configuración del Test**

* Clase de Test: CategoryServiceTest
* Método de Test: delete()
* Framework: Spring Boot Test

**Escenario de Prueba**

Antes de ejecutar el test, se realiza la siguiente configuración:

1. Se crea una categoría de prueba utilizando el método createCategoryDTO().
2. Se registra la categoría de prueba utilizando el método registerCategory() de CategoryService.
3. Se guarda la categoría de prueba en la variable categoryTest.
```
@BeforeEach
void prepareData() {
    // Creación de la categoría de prueba
    CategoryDTO categoryDTO = createCategoryDTO("Categoria de prueba para eliminar", "Categoria de prueba para eliminar", "imagen.jpg", 2);
    // Registro de la categoría de prueba
    categoryTest = categoryService.registerCategory(categoryDTO);
}
```

**Prueba: Eliminar Categoría**

Se realiza la prueba de eliminación de la categoría utilizando el método `delete()` de CategoryService. Se verifica que la categoría exista antes de la eliminación y que lance una excepción ResourceNotFoundException después de la eliminación.
```
@Test
@Order(2)
void delete() {
    // Verificar que la categoría de prueba existe
    assertNotNull(categoryTest);
    
    // Eliminar la categoría de prueba
    categoryService.delete(categoryTest.getIdCategory());
    
    // Verificar que la categoría de prueba no existe después de la eliminación
    assertThrows(ResourceNotFoundException.class, () -> {
        categoryService.searchById(categoryTest.getIdCategory());
    });
}
```

**Resultados Esperados**
* La categoría de prueba existe antes de la eliminación.
* Después de la eliminación, se lanza la excepción ResourceNotFoundException al intentar buscar la categoría eliminada.

Este test verifica el correcto funcionamiento del método `delete()` en CategoryService al eliminar una categoría específica.

**Código** 
```
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
class CategoryServiceTest {

    @Autowired
    private CategoryService categoryService;

    private CategoryDTO categoryTest;

    private CategoryDTO createCategoryDTO(String name, String description, String image, int results) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setName(name);
        categoryDTO.setDescription(description);
        categoryDTO.setImage(image);
        categoryDTO.setResults(results);
        return categoryDTO;
    }

    @BeforeEach
    void prepareData() {
        CategoryDTO categoryDTO = createCategoryDTO("Categoria de prueba para eliminar", "Categoria de prueba para eliminar", "imagen.jpg", 2);
        categoryTest = categoryService.registerCategory(categoryDTO);
    }

    @Test
    @Order(1)
    void registerCategory() {
        CategoryDTO categoryDTO = createCategoryDTO("Categoria de prueba del insert", "Categoria de prueba", "imagen.jpg", 2);

        CategoryDTO categoryTestRegister = categoryService.registerCategory(categoryDTO);
        assertEquals(categoryDTO.getName(), categoryTestRegister.getName());
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
```

### Test Unitario: CityService - CityServiceTest

Este test verifica el comportamiento de los métodos en la clase CityService que están relacionados con la gestión de ciudades.

**Configuración del Test**

* Clase de Test: CityServiceTest 
* Framework: Spring Boot Test

**Escenario de Prueba**

Antes de ejecutar el test, se realiza la siguiente configuración:

1. Se crea una ciudad de prueba utilizando el método registerCity() de CityService.
2. Se guarda la ciudad de prueba en la variable cityDTOTest.
```
@BeforeEach
void prepareData() {
    // Creación de la ciudad de prueba
    CityDTO cityDTO = new CityDTO();
    cityDTO.setName("Ciudad de prueba");
    cityDTO.setCountry("Ciudad de prueba");
    // Registro de la ciudad de prueba
    cityDTOTest = cityService.registerCity(cityDTO);
}
```

**Pruebas**

El test unitario incluye las siguientes pruebas:

1. Prueba: findByName()
* Verifica que se pueda encontrar una ciudad por su nombre.
* Verifica que el resultado no sea nulo.
```
@Test
void findByName() {
    assertNotNull(cityService.findByName(cityDTOTest.getName()));
}
```
2. Prueba: searchById()
* Verifica que se pueda buscar una ciudad por su ID.
* Verifica que el resultado no sea nulo.
```
@Test
void searchById() {
    assertNotNull(cityService.searchById(cityDTOTest.getIdCity()));
}
```
3. Prueba: searchAll()
* Verifica que se puedan buscar todas las ciudades.
* Verifica que el resultado no sea nulo.
```
@Test
void searchAll() {
    assertNotNull(cityService.searchAll());
}
```
4. Prueba: registerCity()
* Verifica que se pueda registrar una nueva ciudad.
* Verifica que el nombre de la ciudad registrada coincida con el nombre proporcionado.
```
@Test
void registerCity() {
    CityDTO cityDTO = new CityDTO();
    cityDTO.setName("Ciudad de prueba para el register");
    cityDTO.setCountry("Ciudad de prueba");
    // Registro de la ciudad de prueba para el register
    CityDTO cityRegister = cityService.registerCity(cityDTO);

    assertEquals(cityRegister.getName(), cityDTO.getName());
}
```
5. Prueba: update()
* Verifica que se pueda actualizar una ciudad existente.
* Verifica que el país de la ciudad se actualice correctamente.
```
@Test
void update() {
String countryNew = "nuevo pais";
cityDTOTest.setCountry(countryNew);
cityDTOTest = cityService.update(cityDTOTest, cityDTOTest.getIdCity());
assertEquals(cityDTOTest.getCountry(), countryNew);
}
```
6. Prueba: delete()
* Verifica que se pueda eliminar una ciudad.
* Verifica que se lance la excepción ResourceNotFoundException al intentar buscar la ciudad eliminada.
```
@Test
void delete() {
    CityDTO cityDTO = new CityDTO();
    cityDTO.setName("Ciudad de prueba para el register");
    cityDTO.setCountry("Ciudad de prueba");
    // Registro de la ciudad de prueba para el register
    CityDTO cityRegister = cityService.registerCity(cityDTO);
    
    // Eliminar la ciudad de prueba
    cityService.delete(cityRegister.getId

```

**Código**
```
package coworking.digitalBooking.Service;

import coworking.digitalBooking.Dto.CityDTO;
import coworking.digitalBooking.Exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@SpringJUnitConfig
@Transactional
class CityServiceTest {

    @Autowired
    private CityService cityService;

    private CityDTO cityDTOTest;

    @BeforeEach
    void prepareData() {
        CityDTO cityDTO = new CityDTO();
        cityDTO.setName("Ciudad de prueba");
        cityDTO.setCountry("Ciudad de prueba");
        cityDTOTest = cityService.registerCity(cityDTO);
    }

    @Test
    void findByName() {
        assertNotNull(cityService.findByName(cityDTOTest.getName()));
    }

    @Test
    void searchById() {
        assertNotNull(cityService.searchById(cityDTOTest.getIdCity()));
    }

    @Test
    void searchAll() {
        assertNotNull(cityService.searchAll());
    }

    @Test
    void registerCity() {
        CityDTO cityDTO = new CityDTO();
        cityDTO.setName("Ciudad de prueba para el register");
        cityDTO.setCountry("Ciudad de prueba");
        CityDTO cityRegister = cityService.registerCity(cityDTO);

        assertEquals(cityRegister.getName(), cityDTO.getName());
    }

    @Test
    void update() {
        String countryNew = "nuevo pais";
        cityDTOTest.setCountry(countryNew);
        cityDTOTest = cityService.update(cityDTOTest, cityDTOTest.getIdCity());
        assertEquals(cityDTOTest.getCountry(), countryNew);
    }

    @Test
    void delete() {
        CityDTO cityDTO = new CityDTO();
        cityDTO.setName("Ciudad de prueba para el register");
        cityDTO.setCountry("Ciudad de prueba");
        CityDTO cityRegister = cityService.registerCity(cityDTO);
        cityService.delete(cityRegister.getIdCity());
        assertThrows(ResourceNotFoundException.class, () -> {
            cityService.searchById(cityRegister.getIdCity());
        });
    }
}
```
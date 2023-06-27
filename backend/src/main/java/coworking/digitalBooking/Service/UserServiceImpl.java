package coworking.digitalBooking.Service;

import coworking.digitalBooking.Dto.UserDTO;
import coworking.digitalBooking.Entities.User;
import coworking.digitalBooking.Exceptions.ResourceNotFoundException;
import coworking.digitalBooking.Repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {


    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDTO searchById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id",id));
        return mapDTO(user);
    }

    @Override
    public List<UserDTO> searchAll() {
        List<User> users = userRepository.findAll();
        return users.stream().map(user -> mapDTO(user)).collect(Collectors.toList());
    }

    @Override
    public UserDTO update(UserDTO userDTO, Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id",id));

        user.setName(userDTO.getName());
        user.setLastname(userDTO.getLastname());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setRoles(userDTO.getRoles());


        User userUpdate = userRepository.save(user);

        return mapDTO(userUpdate);
    }



    // Convierte entidad a DTO
    private UserDTO mapDTO(User user) {
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        return userDTO;
    }

    // Convierte de DTO a Entidad
    private User mapEntity(UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);
        return user;
    }


}

package coworking.digitalBooking.Service;


import coworking.digitalBooking.Dto.UserDTO;

import java.util.List;

public interface UserService {


    public UserDTO searchById(Long id);

    public List<UserDTO> searchAll();

    public UserDTO update(UserDTO userDTO, Long id);

}

package coworking.digitalBooking.Controller;

import coworking.digitalBooking.Dto.LoginDTO;
import coworking.digitalBooking.Dto.UserDTO;
import coworking.digitalBooking.Entities.Rol;
import coworking.digitalBooking.Entities.User;
import coworking.digitalBooking.Repository.RolRepository;
import coworking.digitalBooking.Repository.UserRepository;
import coworking.digitalBooking.Security.JWTAuthResponseDTO;
import coworking.digitalBooking.Security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RolRepository rolRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	
	/*@PostMapping("/login")
	// public ResponseEntity<User> authenticateUser(@RequestBody LoginDTO loginDTO){
	public ResponseEntity<JWTAuthResponseDTO> authenticateUser(@RequestBody LoginDTO loginDTO){
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtTokenProvider.generateToken(authentication);

		// Optional<User> usuario = userRepository.findByEmail(loginDTO.getEmail());

		// return new ResponseEntity<>(usuario.get(), HttpStatus.OK);
		return ResponseEntity.ok(new JWTAuthResponseDTO(token));
	}*/
	@PostMapping("/login")
	public ResponseEntity<JWTAuthResponseDTO> authenticateUser(@RequestBody LoginDTO loginDTO){
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtTokenProvider.generateToken(authentication);

		Optional<User> usuario = userRepository.findByEmail(loginDTO.getEmail());

		// return new ResponseEntity<>(usuario.get(), HttpStatus.OK);
		return ResponseEntity.ok(new JWTAuthResponseDTO(token, usuario.get()));
	}



	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO){

		if(userRepository.existsByEmail(userDTO.getEmail())) {
			return new ResponseEntity<>("Email de usuario ya existe",HttpStatus.BAD_REQUEST);
		}
		
		User user = new User();
		user.setName(userDTO.getName());
		user.setLastname(userDTO.getLastname());
		user.setEmail(userDTO.getEmail());
		user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		
		Rol roles = rolRepository.findByName("ROLE_USER").get();
		user.setRoles(Collections.singleton(roles));

		userRepository.save(user);
		return new ResponseEntity<>(user,HttpStatus.OK);
	}
}

package pe.cibertec.proyecto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import pe.cibertec.proyecto.model.db.Usuarios;
import pe.cibertec.proyecto.request.UsuarioRequest;
import pe.cibertec.proyecto.response.ResultadoResponse;
import pe.cibertec.proyecto.service.UsuarioService;

@Controller
@RequestMapping("/usuario")
public class UsuariosController {

	@Autowired
	private UsuarioService usuarioService;
	
	@PostMapping("/registrarUsuario")
	@ResponseBody
	public ResultadoResponse registrarUsuario(@RequestBody UsuarioRequest usuarioRequest) {
		String mensaje ="Usuario registrado correctamente";
		Boolean respuesta = true;
		try {
			Usuarios objUsu = new Usuarios();
			if(usuarioRequest.getId_usuario() > 0) {
				objUsu.setId_usuario(usuarioRequest.getId_usuario());
			}
			objUsu.setUs_usuario(usuarioRequest.getUs_usuario());
			objUsu.setUs_pass(usuarioRequest.getUs_pass());
			objUsu.setUs_nombres(usuarioRequest.getUs_nombres());
			objUsu.setUs_apellidos(usuarioRequest.getUs_apellidos());
			objUsu.setUs_ventas(usuarioRequest.getUs_ventas());
			objUsu.setUs_tipo(usuarioRequest.getUs_tipo());
			usuarioService.registrarUsuario(objUsu);
		} catch (Exception ex) {
			mensaje="Usuario no registrado";
			respuesta=false;
		}
		return ResultadoResponse.builder().mensaje(mensaje).respuesta(respuesta).build();
	}
	
	@DeleteMapping("/eliminarUsuario")
	@ResponseBody
	public ResultadoResponse eliminarUsuario(@RequestBody UsuarioRequest usuarioRequest) {
		String mensaje ="Usuario eliminado correctamente";
		Boolean respuesta = true;
		try {
			usuarioService.eliminarUsuario(usuarioRequest.getId_usuario());
		} catch (Exception e) {
			mensaje = "Usuario no eliminada";
			respuesta = false;
		}
		return ResultadoResponse.builder().mensaje(mensaje).respuesta(respuesta).build();
	}
	
	@GetMapping("/listarUsuarios")
	@ResponseBody
	public List<Usuarios> listarUsuarios(){
		return usuarioService.listarUsuario();
	}
	
}

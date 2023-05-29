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

import pe.cibertec.proyecto.model.db.Encargos;
import pe.cibertec.proyecto.request.EncargosRequest;
import pe.cibertec.proyecto.response.ResultadoResponse;
import pe.cibertec.proyecto.service.EncargosService;

@Controller
@RequestMapping("/encargos")
public class EncargosController {
	
	@Autowired
	private EncargosService encargosService;
	
	@GetMapping("/listarEncargos")
	@ResponseBody
	public List<Encargos> listarEncargos(){
		return encargosService.listarEncargos();
	}
	
	@PostMapping("/registrarEncargos")
	@ResponseBody
	public ResultadoResponse registrarEncargos(@RequestBody EncargosRequest encargosRequest) {
		String mensaje ="Encargo Registrado Correctamente";
		Boolean respuesta = true;
		try {
			Encargos objEncargos = new Encargos();
			if(encargosRequest.getId_encargos() > 0) {
				objEncargos.setId_encargos(encargosRequest.getId_encargos());
			}
			objEncargos.setEnc_idventas(encargosRequest.getEnc_idventas());
			objEncargos.setEnc_anticipo(encargosRequest.getEnc_anticipo());
			objEncargos.setEnc_fechacreacion(encargosRequest.getEnc_fechacreacion());
			objEncargos.setEnc_fechaentrega(encargosRequest.getEnc_fechaentrega());
			objEncargos.setEnc_estado(encargosRequest.getEnc_estado());
			encargosService.registrarEncargos(objEncargos);
		}catch(Exception ex) {
			mensaje = "Encargo no registrado";
			respuesta = false;
		}
		return ResultadoResponse.builder()
				.mensaje(mensaje)
				.respuesta(respuesta)
				.build();
	}
	
	@DeleteMapping("/eliminarEncargos")
	@ResponseBody
	public ResultadoResponse eliminarEncargo(@RequestBody EncargosRequest encargosRequest) {
		String mensaje = "Encargo Eliminado Correctamente";
		Boolean respuesta = true;
		try {
			encargosService.eliminarEncargos(encargosRequest.getId_encargos());
		}catch (Exception e) {
			mensaje = "Encargo no se pudo Eliminar";
			respuesta = false;
		}
		return ResultadoResponse.builder()
				.mensaje(mensaje)
				.respuesta(respuesta)
				.build();
	}

}

$(document).on("click","#btnAgregarEmpleado",function(){
	modalempleados.classList.remove('ocultar')
	  fondo.classList.remove('ocultar')
	$("#txtUsu").val("");
	$("#txtContraUsu").val("");
	$("#txtNomUsu").val("");
	$("#txtApeUsu").val("");
	$("#txtVentasUsu").val("");
	$("#cboTipoUsu").val("");
	$("#hddidregistrousu").val("0");
});



$(document).on("click",".btnActu",function(){
	$("#txtUsu").val($(this).attr("data-usu_usuario"));
	$("#txtContraUsu").val($(this).attr("data-usu_pass"));
	$("#txtNomUsu").val($(this).attr("data-usu_nom"));
	$("#txtApeUsu").val($(this).attr("data-usu_ape"));
	$("#txtVentasUsu").val($(this).attr("data-usu_venta"));
	$("#cboTipoUsu").val($(this).attr("data-usu_tipo"));
	$("#hddidregistrousu").val($(this).attr("data-id_usuario"));
	
	modalempleados.classList.remove('ocultar')
	  fondo.classList.remove('ocultar')
});


$(document).on("click","#btnguardarUsu",function(){
	$.ajax({
		type: "POST",
		url: "/usuario/registrarUsuario",
		contentType: "application/json",
		data: JSON.stringify({
			id_usuario: $("#hddidregistrousu").val(),
			us_usuario: $("#txtUsu").val(),
			us_pass: $("#txtContraUsu").val(),
			us_nombres: $("#txtNomUsu").val(),
			us_apellidos: $("#txtApeUsu").val(),
			us_ventas: $("#txtVentasUsu").val(),
			us_tipo: $("#cboTipoUsu").val(),
		}),
		success: function(resultado){
			alert(resultado.mensaje);
			ListarUsuario();
		}
	});
	modalempleados.classList.add('ocultar')
	  fondo.classList.add('ocultar')
})

$(document).on("click",".btneliminarUsu",function(){
	$("#hddideliminarusu").val("");
	$("#hddideliminarusu").val($(this).attr("data-id_usu"));
	$("#mensajeeliminar").text("¿Está seguro de eliminar el usuario: "+$(this).attr("data-usu_usuario")+"?");
	
	modalpregunta.classList.remove('ocultar')
	  fondo.classList.remove('ocultar')
});

$(document).on("click",".btnEliminar",function(){
	$.ajax({
		type: "DELETE",
		contentType: "application/json",
		url: "/usuario/eliminarUsuario",
		data: JSON.stringify({
			id_usuario: $("#hddideliminarusuario").val(),
		}),
		success: function(resultado){
			alert(resultado.mensaje);
			ListarUsuario();
		}
	})
	modalpregunta.classList.add('ocultar')
	  fondo.classList.add('ocultar')
});


function ListarUsuario(){
	$.ajax({
		type:"GET",
		url:"/usuario/listarUsuarios",
		dataType: "json",
		success: function(resultado){
			$("#tblusu > tbody").html("");
			$.each(resultado, function(index,value){
				$("#tblusu > tbody").append("<tr>"+
						"<td>"+value.id_usuario+"</td>"+
						"<td>"+value.us_usuario+"</td>"+
						"<td>"+value.us_pass+"</td>"+
						"<td>"+value.us_nombres+"</td>"+
						"<td>"+value.us_apellidos+"</td>"+
						"<td>"+value.us_ventas+"</td>"+
						"<td>"+value.us_tipo+"</td>"+
						"<td>"+
						"<button type='button' class='btn btn-success btnActu'"+
						"data-id_usuario='"+value.id_usuario+"'"+
						"data-usu_usuario='"+value.us_usuario+"'"+
						"data-usu_pass='"+value.us_pass+"'"+
						"data-usu_nom='"+value.us_nombres+"'"+
						"data-usu_ape='"+value.us_apellidos+"'"+
						"data-usu_venta='"+value.us_ventas+"'"+
						"data-usu_tipo='"+value.us_tipo+"'"+
						"><i class='fas fa-pen'></i></button></td>"+
						"<td>"+
						"<button type='button' class='btn btn-danger btneliminarCliente'"+
						"data-id_usuario='"+value.id_usuario+"'"+
						"data-usu_usuario='"+value.us_usuario+"'"+
						"><i class='fas fa-trash'></i></button></td>"+
						"</tr>")
			})
		}
	})
}
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Style from "../styles/components/Create.module.css";
const Create = () => {
  const createForm = useForm({ name: "", category: "", price: 0 });
  const { handleSubmit: create, formState, register } = createForm;
  const { isSubmitting: enviando, errors: errores } = formState;
  const navigate = useNavigate();

  const createData = async (data) => {
    data.price = parseFloat(data.price);
    const endpoint = `${import.meta.env.VITE_BACKEND}/productos/`;
    let config = {};
    config.method = "POST";
    config.headers = { "Content-Type": "application/json" };
    config.body = JSON.stringify(data);
    try {
      const request = await fetch(endpoint, config);
      if (!request.ok) {
        const { message } = await request.json();
        throw new Error(message);
      }
      return navigate(0);
    } catch (error) {
      createForm.setError("servidor", {
        type: "custom",
        message: error.message,
      });
    }
  };
  return (
    <form onSubmit={create(createData)} className={Style.create}>
      <fieldset>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          {...register("name", {
            required: {
              value: true,
              message: "El campo es obligatorio",
            },
            minLength: { value: 4, message: "Minimo 4 caracteres" },
          })}
        />
        {errores && errores.name && <output>{errores.name.message}</output>}
      </fieldset>
      <fieldset>
        <label htmlFor="category">Categoria</label>
        <input
          type="text"
          id="category"
          {...register("category", {
            required: {
              value: true,
              message: "El campo es obligatorio",
            },
            minLength: { value: 3, message: "Minimo 3 caracteres" },
          })}
          list="categories"
        />

        {errores && errores.category && (
          <output>{errores.category.message}</output>
        )}
      </fieldset>
      <fieldset>
        <label htmlFor="price">Precio</label>
        <input
          type="number"
          id="price"
          min={0}
          step={0.25}
          {...register("price", {
            required: {
              value: true,
              message: "El campo es obligatorio",
            },
            min: { value: 0, message: "Valor minimo 0" },
          })}
        />
        {errores && errores.price && <output>{errores.price.message}</output>}
      </fieldset>
      <fieldset>
        <button>{enviando ? "Subiendo" : "Crear"}</button>
        {errores && errores.servidor && (
          <output>{errores.servidor.message}</output>
        )}
      </fieldset>
    </form>
  );
};

export default Create;

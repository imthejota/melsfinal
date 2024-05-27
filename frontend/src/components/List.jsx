import { Eye, EyeOff, Pencil, X } from "lucide-react";
import Style from "../styles/components/List.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const List = ({ products = [] }) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [edit, setEdit] = useState(null);
  const editForm = useForm({ name: "", category: "", price: 0 });
  const { handleSubmit: update, formState, register } = editForm;
  const { isSubmitting: enviando, errors: errores } = formState;
  const updateData = async (data) => {
    data.price = parseFloat(data.price);
    const endpoint = `${import.meta.env.VITE_BACKEND}/productos/${edit.id}`;
    let config = {};
    config.method = "PUT";
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
      editForm.setError("servidor", { type: "custom", message: error.message });
    }
  };

  const setEnable = async (id) => {
    const endpoint = `${import.meta.env.VITE_BACKEND}/productos/${id}`;
    let config = {};
    config.method = "PUT";
    config.headers = { "Content-Type": "application/json" };
    config.body = JSON.stringify({ enable: true });
    try {
      const request = await fetch(endpoint, config);
      if (!request.ok) {
        const { message } = await request.json();
        throw new Error(message);
      }
      return navigate(0);
    } catch (error) {
      editForm.setError("servidor", { type: "custom", message: error.message });
    }
  };

  const setDisable = async (id) => {
    const endpoint = `${import.meta.env.VITE_BACKEND}/productos/${id}`;
    let config = {};
    config.method = "PUT";
    config.headers = { "Content-Type": "application/json" };
    config.body = JSON.stringify({ enable: false });
    try {
      const request = await fetch(endpoint, config);
      if (!request.ok) {
        const { message } = await request.json();
        throw new Error(message);
      }
      return navigate(0);
    } catch (error) {
      editForm.setError("servidor", { type: "custom", message: error.message });
    }
  };

  useEffect(() => {
    const getCategoryList = async () => {
      const endpoint = `${import.meta.env.VITE_BACKEND}/productos/categorias`;
      const data = await (await fetch(endpoint)).json();
      return setCategories(data);
    };
    getCategoryList();
    if (edit != null) {
      editForm.setValue("name", edit.name);
      editForm.setValue("category", edit.category);
      editForm.setValue("price", edit.price);
    }
  }, [edit]);
  return (
    <ul className={Style.list}>
      {products.map(({ name, category, price, _id: id, enable }) => {
        const onEdit = edit != null && edit?.id == id;
        return (
          <li key={id} className={`${Style.item}`}>
            {!onEdit && (
              <dl className={Style.itemData}>
                <dt>Nombre</dt>
                <dt>Categoria</dt>
                <dt>Precio</dt>
                <dd>{name}</dd>
                <dd>{category}</dd>
                <dd>${price.toFixed(2)}</dd>
              </dl>
            )}

            {onEdit && (
              <form onSubmit={update(updateData)} className={Style.itemEdit}>
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
                  {errores && errores.name && (
                    <output>{errores.name.message}</output>
                  )}
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
                  <datalist id="categories">
                    {categories.length > 0 &&
                      categories.map((c, i) => (
                        <option key={i} value={c}>
                          {c}
                        </option>
                      ))}
                  </datalist>
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
                  {errores && errores.price && (
                    <output>{errores.price.message}</output>
                  )}
                </fieldset>
                <fieldset>
                  <button>{enviando ? "Actualizando" : "Actualizar"}</button>
                  {errores && errores.servidor && (
                    <output>{errores.servidor.message}</output>
                  )}
                </fieldset>
              </form>
            )}

            <form
              onSubmit={(e) => e.preventDefault()}
              className={Style.itemActions}
            >
              {(edit == null || edit.id != id) && (
                <button
                  type="button"
                  onClick={() => setEdit({ id, name, category, price })}
                >
                  <Pencil />
                </button>
              )}
              {edit != null && edit.id == id && (
                <button type="button" onClick={() => setEdit(null)}>
                  <X />
                </button>
              )}
              {!enable && (
                <button type="button" onClick={() => setEnable(id)}>
                  <Eye />
                </button>
              )}
              {enable && (
                <button type="button" onClick={() => setDisable(id)}>
                  <EyeOff />
                </button>
              )}
            </form>
          </li>
        );
      })}
    </ul>
  );
};
export default List;

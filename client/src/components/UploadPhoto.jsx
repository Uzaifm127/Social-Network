import PropTypes from "prop-types";

const UploadPhoto = ({ onImageChange, avatarPreview, onTotalSubmit }) => {
  return (
    <form
      onSubmit={onTotalSubmit}
      name="withImage"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border min-w-[25rem] p-20 shadow-lg flex flex-col"
    >
      <label
        htmlFor="upload-image"
        className="rounded-full overflow-hidden mx-auto cursor-pointer mb-10 block"
      >
        <img className="h-60 rounded-full" src={avatarPreview} alt="avatar" />
      </label>
      <input
        id="upload-image"
        name="avatar"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={onImageChange}
      />
      <section className="flex flex-col">
        <button
          type="button"
          name="skip"
          onClick={onTotalSubmit}
          className="border-sky-500 border mb-2 text-black rounded-md text-lg py-1"
        >
          Skip
        </button>
        <button
          type="submit"
          className="bg-sky-500 text-white rounded-md text-lg py-1"
        >
          Submit
        </button>
      </section>
    </form>
  );
};

UploadPhoto.propTypes = {
  onImageChange: PropTypes.func,
  onTotalSubmit: PropTypes.func,
  avatarPreview: PropTypes.string,
};

export default UploadPhoto;

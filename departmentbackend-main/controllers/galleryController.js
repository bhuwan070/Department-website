const { db } = require('../connection/db');

exports.addNewGallery = async (req, res) => {
  const name = req.body.name;

  let sql = 'INSERT INTO gallery (name) VALUES (?)';
  db.query(sql, [name], async (error, result) => {
    if (error)
      return res.status(500).json({ status: 'error', message: error.message });
    if (req.files && req.files.length > 0) {
      const galleryImages = req.files.map((file) => [
        result.insertId,
        file.destination + '/' + file.filename,
      ]);
      db.query(
        'INSERT INTO gallery_image (gallery_id, image_path) VALUES ?',
        [galleryImages],
        (imagesError, imagesResult) => {
          if (imagesError)
            res
              .status(500)
              .json({ status: 'error', message: imagesError.message });
          return res.status(200).json({
            status: 'success',
            message: 'Gallery created successfully',
          });
        }
      );
    }
  });
};

exports.addImagesToGallery = async (req, res) => {
  const { galleryId } = req.params;

  if (!req.files || req.files.length === 0) {
    return res
      .status(400)
      .json({ status: 'error', message: 'No images provided' });
  }

  const galleryImages = req.files.map((file) => [
    galleryId,
    file.destination + '/' + file.filename,
  ]);
  const sql = 'INSERT INTO gallery_image (gallery_id, image_path) VALUES ?';

  db.query(sql, [galleryImages], (error, result) => {
    if (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }

    const selectSql = `SELECT id, image_path FROM gallery_image WHERE gallery_id = ? ORDER BY id DESC LIMIT ?`;

    db.query(
      selectSql,
      [galleryId, req.files.length],
      (selectError, images) => {
        if (selectError) {
          return res
            .status(500)
            .json({ status: 'error', message: selectError.message });
        }

        res.status(200).json({
          status: 'success',
          message: 'Images added to gallery successfully',
          data: { images }, 
        });
      }
    );
  });
};

exports.getAllGallery = async (req, res) => {
  const sqlGalleries = 'SELECT * FROM gallery';
  const sqlImages = 'SELECT image_path FROM gallery_image WHERE gallery_id = ?';

  db.query(sqlGalleries, (error, galleries) => {
    if (error)
      return res.status(500).json({ status: 'error', message: error.message });

    const galleryPromises = galleries.map((gallery) => {
      return new Promise((resolve, reject) => {
        db.query(sqlImages, [gallery.id], (imagesError, images) => {
          if (imagesError) return reject(imagesError);

          gallery.images = images.map((image) => image.image_path);
          resolve(gallery);
        });
      });
    });

    Promise.all(galleryPromises)
      .then((results) =>
        res.status(200).json({ status: 'success', data: results })
      )
      .catch((imagesError) =>
        res.status(500).json({ status: 'error', message: imagesError.message })
      );
  });
};

exports.getGalleryWithImageID = async (req, res) => {
  const sqlGalleries = 'SELECT * FROM gallery';
  const sqlImages =
    'SELECT id,image_path FROM gallery_image WHERE gallery_id = ?';

  db.query(sqlGalleries, (error, galleries) => {
    if (error)
      return res.status(500).json({ status: 'error', message: error.message });

    const galleryPromises = galleries.map((gallery) => {
      return new Promise((resolve, reject) => {
        db.query(sqlImages, [gallery.id], (imagesError, images) => {
          if (imagesError) return reject(imagesError);
          gallery.images = images;
          resolve(gallery);
        });
      });
    });

    Promise.all(galleryPromises)
      .then((results) =>
        res.status(200).json({ status: 'success', data: results })
      )
      .catch((imagesError) =>
        res.status(500).json({ status: 'error', message: imagesError.message })
      );
  });
};

exports.getGalleryById = async (req, res) => {
  const { id } = req.params;

  const sqlGallery = 'SELECT * FROM gallery WHERE id = ?';
  const sqlImages = 'SELECT image_path FROM gallery_image WHERE gallery_id = ?';

  db.query(sqlGallery, [id], (error, galleryResults) => {
    if (error)
      return res.status(500).json({ status: 'error', message: error.message });

    if (galleryResults.length === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Gallery not found' });
    }

    const gallery = galleryResults[0];

    db.query(sqlImages, [id], (imagesError, imagesResults) => {
      if (imagesError)
        return res
          .status(500)
          .json({ status: 'error', message: imagesError.message });

      gallery.images = imagesResults.map((image) => image.image_path);
      res.status(200).json({ status: 'success', data: gallery });
    });
  });
};

exports.updateGallery = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  let sql = 'UPDATE gallery SET name = ? WHERE id = ?';
  db.query(sql, [name, id], (error, result) => {
    if (error)
      return res.status(500).json({ status: 'error', message: error.message });

    if (req.files && req.files.length > 0) {
      sql = 'DELETE FROM gallery_image WHERE gallery_id = ?';
      db.query(sql, [id], (deleteError) => {
        if (deleteError)
          return res
            .status(500)
            .json({ status: 'error', message: deleteError.message });

        const galleryImages = req.files.map((file) => [id, file.path]);
        sql = 'INSERT INTO gallery_image (gallery_id, image_path) VALUES ?';
        db.query(sql, [galleryImages], (ImagesError, imagesResult) => {
          if (ImagesError)
            return res
              .status(500)
              .json({ status: 'error', message: ImagesError.message });

          return res.status(200).json({
            status: 'success',
            message: 'Gallery updated successfully',
          });
        });
      });
    } else {
      return res
        .status(200)
        .json({ status: 'success', message: 'Gallery updated successfully' });
    }
  });
};

exports.deleteGallery = async (req, res) => {
  const { id } = req.params;

  let sql = 'DELETE FROM gallery_image WHERE gallery_id = ?';
  db.query(sql, [id], (deleteImagesError) => {
    if (deleteImagesError)
      return res
        .status(500)
        .json({ status: 'error', message: deleteImagesError.message });

    sql = 'DELETE FROM gallery WHERE id = ?';
    db.query(sql, [id], (deleteGalleryError) => {
      if (deleteGalleryError)
        return res
          .status(500)
          .json({ status: 'error', message: deleteGalleryError.message });

      return res
        .status(200)
        .json({ status: 'success', message: 'Gallery deleted successfully' });
    });
  });
};

exports.deleteGalleryImage = async (req, res) => {
  const { galleryId, imageId } = req.params;

  let sql = 'DELETE FROM gallery_image WHERE gallery_id = ? AND id = ?';
  db.query(sql, [galleryId, imageId], (error, result) => {
    if (error)
      return res.status(500).json({ status: 'error', message: error.message });

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Image not found' });
    }

    res
      .status(200)
      .json({ status: 'success', message: 'Image deleted successfully' });
  });
};

const sharp = require('sharp'),
    path = require('path'),
    fs = require('fs'),
    src_dir = path.resolve(__dirname, '../src/img/'),
    final_dir = path.resolve(__dirname, '../public/images');

// создаем папку
fs.mkdir(final_dir, err => {
    if (err) console.log(err);

    // ищем файлы в папке с изображениями
    fs.readdir(src_dir, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
                console.log(`Resizing image ${file} ...`);


                let src = path.resolve(src_dir, file), // откуда читаем
                    destination = path.resolve(final_dir, file); // куда сохраняем

                sharp(src)
                    .jpeg({
                        quality:     80, // сжимаем изображение
                        progressive: true
                    })
                    .resize({
                        width:              2560, // меняем размер
                        withoutEnlargement: true // не увеличиваем маленькие
                    })
                    .toFile(destination, (err, info) => {
                        if (err) throw err;
                    });
            }
        );
    });
});


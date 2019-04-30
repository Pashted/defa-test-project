const sharp = require('sharp'),
    path = require('path'),
    fs = require('fs'),
    src_dir = path.resolve(__dirname, '../src/images/'),
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
                    destination = path.resolve(final_dir, file.replace(/\.([^.]+)$/, '_small.$1')); // куда сохраняем

                sharp(src)
                    .jpeg({
                        quality:     80, // сжимаем изображение
                        progressive: true
                    })
                    .resize({
                        width:              1600, // меняем размер
                        withoutEnlargement: true // не увеличиваем маленькие
                    })
                    .toFile(destination, (err, info) => {
                        if (err) throw err;
                    });
            }
        );
    });
});


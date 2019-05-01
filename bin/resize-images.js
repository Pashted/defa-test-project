const sharp = require('sharp'),
    path = require('path'),
    fs = require('fs'),
    src_dir = path.resolve(__dirname, '../src/images/'),
    final_dir = path.resolve(__dirname, '../public/images');

let makeFile = (file, suffix, width, height) => {

    let src = path.resolve(src_dir, file), // откуда читаем
        small = path.resolve(final_dir, file.replace(/\.([^.]+)$/, `_${suffix}.$1`)), // куда сохраняем

        resize_params = {
            // kernel:             sharp.kernel.cubic, // метод интерполяции
            withoutEnlargement: true // не увеличиваем маленькие
        };

    // меняем размер
    if (width)
        resize_params.width = width;
    if (height)
        resize_params.height = height;

    sharp(src)
        .jpeg({
            quality:     90, // сжимаем изображение
            progressive: true
        })
        .resize(resize_params)
        .sharpen()
        .toFile(small, (err, info) => {
            if (err) throw err;
        });
};

// создаем папку
fs.mkdir(final_dir, { recursive: true }, err => {
    if (err) console.log(err);

    // ищем файлы в папке с изображениями
    fs.readdir(src_dir, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
                console.log(`Resizing image ${file} ...`);

                makeFile(file, 'normal', 1200);
                makeFile(file, 'small', null, 304);

            }
        );
    });
});


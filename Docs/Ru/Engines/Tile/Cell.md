Engines.Tile.Engine.Cell
========================

Каждая ячейка тайлового движка является объектом `TileEngine.Cell`
Эти объекты не создаются вручную, только внутри `TileEngine` и используются для двух целей:
* Изменение и получение значения ячейки
* Контейнер данных для отрисовки ячейки

### Свойства

* `engine` - ссылка на движок `TileEngine`
* `point` - координаты ячейки на поле
* `rectangle` - прямоугольник, описывающий ячейку в пикселях
* `value` - текущее значение ячейки. Изменение этого свойства автоматически обновляет `requireUpdate` у `TileEngine`
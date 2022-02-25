/**
 * TODO описание
 * @class
*/
function PLDragObject (fun, _boolKrai) {
	this.type = 'PLDragObject';
	this.fun = fun;
	var self = this;

	this.draggable = true; // таскание
	this.arrBtnEventTransfer = [0]; // originalEvent.button == 0 1 2 // кнпки которые будут передавать нажатие

	this._uniformScaling = false; // пропорциональное масштабирование
	this.aspectRatio = 1; // cоотноше́ние сторо́н
	this._oppositeCenter = false; // при нажатии на кнопки будет ли центр смещатся напротив кнопки

	this._boolFont = true; // отрисовка заднего фона

	this._scaleRect = 1; // масштабирование ректа
	this._butRot = true; // показывать ли кнопки поворота
	this._normDrag = 'null'; // какие кнопки управления будут видны  |   ”norm”-остаются только 4 кнопки.|'null': {//”null”-все кроме большой контурной кнопки подложки пропадают.|'norm-width': {//”norm-width”-остаются только 2 кнопки.
	this._widthNot = false; // запрет на масштабирование по ширине
	this._heightNot = false; // запрет на масштабирование по высоте
	this._upBtnRot = false; // поднятие кнопок(поворота над кнопками масштабирования)
	this._distRot = false; // выносная кнопка поворота

	this._mashtab = 1; // масштаб для кнопок управления
	this._parent; // PIXI.Container сюда кидается таскалка(управление кнопки)
	this._boolKrai = false;
	this._rectangle = new Rectangle(-50, -50, 100, 100); // рект который драгим масштабируем
	this.rectAbsolut = new Rectangle(-50, -50, 100, 100); // рект который драгим масштабируем
	this.content = new PIXI.Container();
	this._angel = 0; // поворот ректа
	this.isKontur = true;
	this.backGround = null; // цвет для фона

	this.isDown = false;

	this.angelMove = null; // привязка позиции мува по углу , радианы (null-выключено)

	this.vectorMove = null; // привязка позиции мува по вертикали и горизонтали относительно клика, null - выкл, number - дистанция к осям

	this._otstupKrai = 0; // отрисовка дополнительного поля
	this._interactive = true;

	this.rectArea = new PIXI.Rectangle(0, 0, 1, 1);

	// Ограничивающий таскание рект
	this.borderRect = new Rectangle(-Infinity, -Infinity, Infinity, Infinity);

	this.contentM = new PIXI.Container();
	this.content.addChild(this.contentM);

	this.graphics = new PIXI.Graphics();
	this.content.addChild(this.graphics);

	this.graphics2 = new PIXI.Graphics();
	this.contentM.addChild(this.graphics2);

	this.graphics3 = new PIXI.Graphics();
	this.contentM.addChild(this.graphics3);
	// this.contentM.hitArea = this.rectArea;
	this.debug = false;

	if (this.debug == true) {

		this.graphics2.lineStyle(2, 0x00ff00, 1);
		this.graphics2.drawCircle(0, 0, 10);


		this.graphics3.lineStyle(2, 0xff0000, 1);
		this.graphics3.drawCircle(0, 0, 20);
	}

	this.tipDrag = 'null';

	var tempBtn;
	this._wh = pl102.wh; // 20       // размер кнопок с верху
	this._wh2 = pl102.wh * 2; // размер кнопок с низу

	this._minDrag = 20; // минимальный размер ректа при драге
	this.minDragH = 20; // мин размер по высоте при драге
	this.minDragW = 20; // мин размер по ширине при драге

	this.maxDragH = 100000000; // макс размер по ширине по высоте при драге
	this.maxDragW = 100000000; // макс размер по высоте по высоте при драге
	this.scaleDebag = 1;

	this.angelStep = Math.PI / 2;
	this.angelSah = 0.1;

	this.pivot = new Position(0.5, 0.5); // смещение центра ректа
	this.pivotDrag = new Position(); // для расчетов установки центра (позиция смещения)
	this.center = new Position(); // для расчетов установки центра (предварительный центр)
	this.centerPoint = new Position(); // для расчетов установки центра (позиция ректа)

	var t = false; // TipProporcion
	var eps = 1e-5; // погрешность пропорций // 0.00001
	var pr, pr2, pr3, p4, p5; // для обновления пропорций

	var p2xz = new Position(); // для расчетов абсолютного центра positAbcolut
	this.pointCA = new Position(); // центр абсолют |для расчетов абсолютного центра positAbcolut

	var pointS = new Position();
	var pointSBut = new Position();
	var pointSV = new Position();
	var pointMouseS = new Position();
	var rectDin = new Rectangle();


	var pointSVAngel = new Position();

	var pointNull = new Position();
	var pointDin = new Position();
	var pointDin2 = new Position();
	var butDown, d, a, a1, d1, d2, a2, prosent;
	var angelStart;
	var globPoint;

	var localDown;
	var localMove;
	var localMoveRotation = new Position();

	this.okSob = true;
	this.contentPoint = new PIXI.Container();
	this.content.addChild(this.contentPoint);

	this.contentPlus = new PIXI.Container();
	this.content.addChild(this.contentPlus);

	this.content1 = new PIXI.Container();


	// this.distanceRotation = new DistanceRotation(this.content1, function () {
	this.distanceRotation = new DistanceRotationCircle(this.content1, function () {
		if (self.angelStep != -1) {
			this.angel = calc.okrugAngel(this.angel, self.angelStep, self.angelSah);
		}
		var ang = this.angel;
		var prevPivotX = self.pivot.x;
		var prevPivotY = self.pivot.y;
		self.pivot.set(0.5, 0.5);
		self.setCenter(self.pivot);
		self.angel = ang;
		self.pivot.set(prevPivotX, prevPivotY);
		self.butDown = this.type;
		self.tipDrag = 'rotation';
		if (self.fun) self.fun();
	});
	this.distanceRotation.funDown = function () {
		if (self.funMouseDown) self.funMouseDown();
	};
	this.distanceRotation.funUp = function () {
		if (self.funUp) self.funUp();
	};

	this.distanceRotation.activ = this._distRot;

	this.content1.addChild(this.content);

	var line = new LinePosition(); // для расчетов привязок к angelMove
	function korectLocalMoveFromAngelMove () {
		var maxOffsetLine = 999999999; // длинна линий
		calc.getVector(maxOffsetLine, self.angelMove, line.p);
		calc.getVector(-maxOffsetLine, self.angelMove, line.p1);
		line.p.x += localDown.x;
		line.p.y += localDown.y;
		line.p1.x += localDown.x;
		line.p1.y += localDown.y;
		var pLine = calc.isPointInLin(line.p, line.p1, self.content1.toLocal(pl102.global), maxOffsetLine, 0);
		localMove.set(pLine.x, pLine.y);
	}

	var lineVectGor = new LinePosition();
	var lineVectVert = new LinePosition();

	function korectLocalMoveFromVectorsClick () {
		var maxOffsetLine = 99999; // длинна линий
		calc.getVector(maxOffsetLine, 90 * calc.DEG2RAD, lineVectGor.p);
		calc.getVector(-maxOffsetLine, 90 * calc.DEG2RAD, lineVectGor.p1);
		lineVectGor.p.x += localDown.x;
		lineVectGor.p.y += localDown.y;
		lineVectGor.p1.x += localDown.x;
		lineVectGor.p1.y += localDown.y;

		calc.getVector(maxOffsetLine, 0 * calc.DEG2RAD, lineVectVert.p);
		calc.getVector(-maxOffsetLine, 0 * calc.DEG2RAD, lineVectVert.p1);
		lineVectVert.p.x += localDown.x;
		lineVectVert.p.y += localDown.y;
		lineVectVert.p1.x += localDown.x;
		lineVectVert.p1.y += localDown.y;
		var pLine = calc.isPointInLin(lineVectGor.p, lineVectGor.p1, self.content1.toLocal(pl102.global), self.vectorMove / self._mashtab, 0);
		var pLine2 = calc.isPointInLin(lineVectVert.p, lineVectVert.p1, self.content1.toLocal(pl102.global), self.vectorMove / self._mashtab, 0);

		if (pLine != null && pLine2 == null) {
			localMove.set(pLine.x, pLine.y);
		}

		if (pLine2 != null && pLine == null) {
			localMove.set(pLine2.x, pLine2.y);
		}

		if (pLine2 != null && pLine != null) {
			localMove.set(localDown.x, localDown.y);
		}
	}

	var azap;
	this.boolChanges = false;
	this.funMouseMove;
	this.stageMove = function (e) {
		localMove = self.content1.toLocal(pl102.global);
		if (self.angelMove !== null) korectLocalMoveFromAngelMove();

		if (self.vectorMove != null) korectLocalMoveFromVectorsClick();

		pointSV.set(localMove.x - localDown.x, localMove.y - localDown.y);
		pointSVAngel.set(pointSV.x + pointSBut.x, pointSV.y + pointSBut.y);

		// Проверка, произошли ли изменения
		if (pointSVAngel.x <= 1 && pointSVAngel.x >= -1 && pointSVAngel.y <= 1 && pointSVAngel.y >= -1 && pointSVAngel.z <= 1 && pointSVAngel.z >= -1) {
			self.boolChanges = false;
		} else {
			self.boolChanges = true;
		}

		if (butDown != 20) { //
			localMoveRotation.set(localMove.x, localMove.y);
			calc.rotationPoint(localMoveRotation, -self._rectangle.angel, localDown);

			pointSV.set(localMoveRotation.x - localDown.x, localMoveRotation.y - localDown.y);
			pointSVAngel.set(pointSV.x + pointSBut.x, pointSV.y + pointSBut.y);
		}

		azap = calc.getAngle(pointSVAngel, pointNull) * calc.RAD2DEG;

		if (butDown == 8) {
			self.zdvig('height', pointSVAngel, false);
			self.zdvig('width', pointSVAngel, false);
		}
		if (butDown == 7) {
			self.zdvig('height', pointSVAngel, false);
		}
		if (butDown == 6) {
			self.zdvig('height', pointSVAngel, false);
			pointSVAngel.x += rectDin.x;
			self.zdvig('width', pointSVAngel, true);
		}
		if (butDown == 5) {
			self.zdvig('width', pointSVAngel, false);
		}
		if (butDown == 4) {
			self.zdvig('korectC', pointSVAngel);
		}
		if (butDown == 3) {
			pointSVAngel.x += rectDin.x;
			self.zdvig('width', pointSVAngel, true);
		}
		if (butDown == 2) {
			self.zdvig('width', pointSVAngel, false);
			pointSVAngel.y += rectDin.y;
			self.zdvig('height', pointSVAngel, true);
		}
		if (butDown == 1) {
			pointSVAngel.y += rectDin.y;
			self.zdvig('height', pointSVAngel, true);
		}
		if (butDown == 0) {
			pointSVAngel.x += rectDin.x;
			self.zdvig('width', pointSVAngel, true);
			pointSVAngel.y += rectDin.y;
			self.zdvig('height', pointSVAngel, true);
		}
		if ((butDown >= 10) && (butDown < 20)) {
			var angR = startRotation - (angelStart - calc.getAngle(self.content1.toGlobal(self.rectangle.p), pl102.global));
			if (self.angelStep != -1) { // Коректируем относительно угла
				angR = calc.okrugAngel(angR, self.angelStep, self.angelSah);
				self.zdvig('angel', angR);
			} else {
				self.zdvig('angel', angR);
			}

		}
		if (butDown == 20) {
			pointSVAngel.x = rectDin.p.x + pointSV.x;
			pointSVAngel.y = rectDin.p.y + pointSV.y;

			if (self.draggable) {
				self.zdvig('posit', pointSVAngel);
			}
		}


		self.bw = self.rectangle.width;
		self.bh = self.rectangle.height;
		self.bx = self.rectangle.x;
		self.by = self.rectangle.y;

		if (self.funMouseMove) self.funMouseMove(e);
	};

	this.chekZdvigTip = function (tip) {

		if (this._widthNot && tip == 'width') return false;
		if (this._heightNot && tip == 'height') return false;

		return true;
	};


	this.chekOutOfBorder = function (point) {

		if (point.x < this.borderRect.x + self._rectangle.width * this.pivot.x) { point.x = this.borderRect.x + self._rectangle.width * this.pivot.x; } 
		else if (point.x > this.borderRect.width - self._rectangle.width * this.pivot.x) { point.x = this.borderRect.width - self._rectangle.width * this.pivot.x; }

		if (point.y < this.borderRect.y + self._rectangle.height * this.pivot.y) { point.y = this.borderRect.y + self._rectangle.height * this.pivot.y; } 
		else if (point.y > this.borderRect.height - self._rectangle.height * this.pivot.y) { point.y = this.borderRect.height - self._rectangle.height * this.pivot.y; }
	};


	var pros = 2;
	var dinOffsetW = 0; // добавляем для width
	var dinOffsetH = 0; // добавляем для height
	this.zdvig = function (tip, p, bool) {

		if (!self.chekZdvigTip(tip)) return;

		if (this.oppositeCenter == false) {
			pros = 2;
			// при изминении размеров от центра, размер ректа уманьшаетса в 2 раза,
			// необходимо учесть это и добавить
			dinOffsetW = rectDin.width / 2;
			dinOffsetH = rectDin.height / 2;
		} else {
			pros = 1;
			// при изминении размеров от кнопки напротив, все работает нормально
			dinOffsetW = 0;
			dinOffsetH = 0;
		}

		if (tip == 'height') {

			if (bool == false) {

				d1 = p.y - self._rectangle.y + dinOffsetH;

				if (d1 < this.minDrag) d1 = this.minDrag;
				if (d1 < this.minDragH) d1 = this.minDragH;
				if (d1 > this.maxDragH) d1 = this.maxDragH;

				d2 = d1 / self._rectangle.height * self._rectangle.y;

				self._rectangle.height = d1;
				self._rectangle.y = d2;

			} else {

				d2 = p.y - rectDin.y - dinOffsetH;

				if (d2 > -this.minDrag / pros) d2 = -this.minDrag / pros;
				if (d2 > -this.minDragH / pros) d2 = -this.minDragH / pros;
				if (d2 < -this.maxDragH / pros) d2 = -this.maxDragH / pros;

				d1 = rectDin.height * d2 / rectDin.y;

				if (d1 < this.minDrag / pros) d1 = this.minDrag / pros;
				if (d1 < this.minDragH / pros) d1 = this.minDragH / pros;

				self._rectangle.height = d1;
				self._rectangle.y = d2;
			}

			self.chekOutOfBorder(self._rectangle.p);

			this.draw102();
		}

		if (tip == 'width') {

			if (bool == false) {

				d1 = p.x - self._rectangle.x + dinOffsetW;

				if (d1 < this.minDrag) d1 = this.minDrag;
				if (d1 < this.minDragW) d1 = this.minDragW;
				if (d1 > this.maxDragW) d1 = this.maxDragW;

				d2 = d1 / self._rectangle.width * self._rectangle.x;

				self._rectangle.width = d1;
				self._rectangle.x = d2;
			} else {

				d2 = p.x - rectDin.x - dinOffsetW;

				if (d2 > -this.minDrag / pros) d2 = -this.minDrag / pros;
				if (d2 > -this.minDragW / pros) d2 = -this.minDragW / pros;
				if (d2 < -this.maxDragW / pros) d2 = -this.maxDragW / pros;

				d1 = rectDin.width * d2 / rectDin.x;

				if (d1 < this.minDrag / pros) d1 = this.minDrag / pros;
				if (d1 < this.minDragW / pros) d1 = this.minDragW / pros;

				self._rectangle.width = d1;
				self._rectangle.x = d2;
			}

			self.chekOutOfBorder(self._rectangle.p);

			this.draw102();
		}


		// коректируем опору
		if (tip == 'korectC') {
			d2 = calc.getDistance(p, pointNull);
			a2 = calc.getAngle(p, pointNull);
			calc.getVector(d2, a2 + self._rectangle.angel + Math.PI, pointDin);
			pointDin.x += rectDin.p.x;
			pointDin.y += rectDin.p.y;

			self._rectangle.p.y = pointDin.y;
			self._rectangle.p.x = pointDin.x;

			self._rectangle.y = rectDin.y - p.y;
			self._rectangle.x = rectDin.x - p.x;

			this.draw102();
		}

		if (tip == 'posit') {

			self.chekOutOfBorder(p);

			if (!self._widthNot) self._rectangle.p.x = p.x;
			if (!self._heightNot) self._rectangle.p.y = p.y;

			this.draw102();
		}

		if (tip == 'angel') {
			self._rectangle.angel = p;
			self.chekOutOfBorder(self._rectangle.p);
			this.draw102();
		}
		// pxDebag.clear();
		this.positAbcolut();
		// pxDebag.dPoint(this.pointCA,4,0x00ff00,5);

		if (self.uniformScaling) {
			if (this.getTipProporcion()) {
				self.updateProporcion(true);
				self.updateProporcion(false);
			} else {
				self.updateProporcion(false);
				self.updateProporcion(true);
			}
		}
		// if(self.uniformScaling) self.updateProporcion(this.getTipProporcion());

		this.positAbcolut();

		// pxDebag.dPoint(this.pointCA,4,0xff0000,8);
		if (self.okSob == true) { if (self.fun) self.fun(); }
	};


	// вычисляем центор обьекта
	this.pointCB = new Position();
	this.positAbcolut = function () {
		p2xz.x = this._rectangle.x + this._rectangle.width / 2;
		p2xz.y = this._rectangle.y + this._rectangle.height / 2;
		a = calc.getAngle(pointNull, p2xz);
		d = calc.getDistance(pointNull, p2xz);
		calc.getVector(d, a + self._rectangle.angel, this.pointCA);
		this.pointCA.x += self._rectangle.p.x;
		this.pointCA.y += self._rectangle.p.y;


		p2xz.x = this._rectangle.x;
		p2xz.y = this._rectangle.y;
		a = calc.getAngle(pointNull, p2xz);
		d = calc.getDistance(pointNull, p2xz);
		calc.getVector(d, a + self._rectangle.angel, this.pointCB);
		this.pointCB.x += self._rectangle.p.x;
		this.pointCB.y += self._rectangle.p.y;


		this.rectAbsolut.p.x = this.pointCB.x;
		this.rectAbsolut.p.y = this.pointCB.y;
		this.rectAbsolut.x = 0;
		this.rectAbsolut.y = 0;
		this.rectAbsolut.width = this._rectangle.width;
		this.rectAbsolut.height = this._rectangle.height;
		this.rectAbsolut.angel = self._rectangle.angel;

		if (this.debug == true) {

			this.graphics2.x = this.rectAbsolut.x;
			this.graphics2.y = this.rectAbsolut.y;
		}

	};

	// получаем тип к чему приводить пропорцию(true - ширина, false - высота) относительно угла
	this.getTipProporcion = function () {
		t = true;
		if (butDown == 0) {
			if ((azap > -180 + 45) && (azap < 45)) {
				t = true;
			} else t = false;
		}
		if (butDown == 1 || butDown == 7) t = false;
		if (butDown == 2) { if ((azap > -45) && (azap < 180 - 45)) t = false; }
		if (butDown == 3 || butDown == 5) t = true;

		if (butDown == 6) {
			if ((azap > -45) && (azap < 180 - 45)) {
				t = true;
			} else t = false;
		}
		if (butDown == 8) {
			if ((azap > -180 + 45) && (azap < 45)) {
				t = false;
			} else t = true;
		}
		return t;
	};

	// isWidth - true пропорционально к width, false - пропорционально к height
	this.updateProporcion = function (isWidth) {

		self.rectangle.width = Math.min(self.rectangle.width, self.maxDragW);
		self.rectangle.height = Math.min(self.rectangle.height, self.maxDragH);

		self.rectangle.width = Math.max(self.rectangle.width, self.minDragW);
		self.rectangle.height = Math.max(self.rectangle.height, self.minDragH);

		pr = self.rectangle.width / self.rectangle.height;

		if (Math.abs(pr - self.aspectRatio) > eps) {
			if (isWidth) {
				pr2 = self.rectangle.height;
				self.rectangle.height = self.rectangle.width / self.aspectRatio;
				self.rectangle.width = self.rectangle.height * self.aspectRatio;
			} else {
				pr2 = self.rectangle.width;
				self.rectangle.width = self.rectangle.height * self.aspectRatio;
				self.rectangle.height = self.rectangle.width / self.aspectRatio;
			}

			if (self.oppositeCenter == false) {
				self.rectangle.x = -self.rectangle.width / 2;
				self.rectangle.y = -self.rectangle.height / 2;
			} else {

				// self.rectangle.x = -self.rectangle.width/2;
				// self.rectangle.y = -self.rectangle.height/2;

				// if (isWidth==true) {
				// pr3=(pr2-self.rectangle.height)/2
				// self.rectangle.y = self.rectangle.y+pr3;
				// self.rectangle.p.y = self.rectangle.p.y-pr3;
				// pointS.y+=pr3

				pr3 = (pr2 - self.rectangle.height) / 2;
				p5 = 1;

				p4 = self.rectangle.y + pr3;
				if (p4 < 0) p5 = -1;
				if (Math.abs(p4) > self.rectangle.height) p4 = self.rectangle.height * p5;
				self.rectangle.y = self.rectangle.height * p5 * self.pivot.y;


				// } else {

				// self.rectangle.p.x = (self.pivot.x-0.5)*2*self.rectangle.width

				pr3 = (pr2 - self.rectangle.width) / 2;
				p5 = 1;

				p4 = self.rectangle.x + pr3;
				if (p4 < 0) p5 = -1;
				if (Math.abs(p4) > self.rectangle.width) p4 = self.rectangle.width * p5;
				self.rectangle.x = self.rectangle.width * p5 * self.pivot.x;


				// self.rectangle.p.x = self.rectangle.p.x-pr3;
				// }
			}
			this.draw102();
			return true;
		}
		return false;
	};


	this.funUp;
	this.okUp = false;
	this.notZdvig = false;

	this.stageUp = function (e) {
		pl102.interaction.isNotChangeCursorMouseOverOut = false;
		self.isDown = false;
		// self.cursor.show(-1,-1);
		self.updateCursor();
		self.buttonDragAll._mashtab = -1;

		self.buttonDragAll.mashtab = self._mashtab;

		self.buttonDragAll.activBat(999);


		if (pl102.isMouseEvents) {
			pl102.stage.off('mousemove', self.stageMove);
			pl102.stage.off('mouseup', self.stageUp);
		}

		if (pl102.isTouchEvents) {
			pl102.stage.off('touchmove', self.stageMove);
			pl102.stage.off('touchend', self.stageUp);
		}


		if (self.okUp == true) {
			if (self.funUp) {
				self.funUp();
			}
		}
		self.tipDrag = 'null';
		self.okUp = false;
	};

	// при нажатии на кнопки будет ли центр смещатся напротив кнопки
	this.chekOppositeCenter = function (name) {
		if (!self.oppositeCenter) return;

		if (name == 0 || name - 10 == 0) {
			self.pivot.x = 1;
			self.pivot.y = 1;
		} else
		if (name == 1 || name - 10 == 1) {
			self.pivot.x = 0.5;
			self.pivot.y = 1;
		} else
		if (name == 2 || name - 10 == 2) {
			self.pivot.x = 0;
			self.pivot.y = 1;
		} else
		if (name == 3 || name - 10 == 3) {
			self.pivot.x = 1;
			self.pivot.y = 0.5;
		} else
		if (name == 4 || name == 20) {
			return;
		} else
		if (name == 5 || name - 10 == 5) {
			self.pivot.x = 0;
			self.pivot.y = 0.5;
		} else
		if (name == 6 || name - 10 == 6) {
			self.pivot.x = 1;
			self.pivot.y = 0;
		} else
		if (name == 7 || name - 10 == 7) {
			self.pivot.x = 0.5;
			self.pivot.y = 0;
		} else
		if (name == 8 || name - 10 == 8) {
			self.pivot.x = 0;
			self.pivot.y = 0;
		} else {
			return;
		}
		self.setCenter(self.pivot);
	};

	var startRotation = 0;

	this.butDown = 0;
	this.boolDrag = true;
	this.funDown = function (e) {

		if (!pl102.devas) { if (e && self.arrBtnEventTransfer.indexOf(e.data.originalEvent.button) == -1) return; }
		self.boolChanges = false;
		self.isDown = true;
		pl102.interaction.isNotChangeCursorMouseOverOut = true;

		self.tipDrag = 'null';
		butDown = this.name;
		self.butDown = this.name;


		if (butDown != 20 && butDown != 4) {
			if (self.notZdvig == false) {
				self.pivot.x = self.pivot.y = 0.5;
				self.setCenter(self.pivot);
				self.tipDrag = 'drag';
			}

		}

		self.boolDrag = false;
		if (butDown == undefined) self.boolDrag = true;
		else {
			if ((butDown >= 0) && (butDown <= 8)) self.tipDrag = 'scale';
			if ((butDown >= 10) && (butDown <= 18)) self.tipDrag = 'rotation';

			if (butDown == 20) self.boolDrag = true;
			if (butDown == 4) self.boolDrag = true;

		}

		self.buttonDragAll.activBat(butDown);


		if (this.position == undefined) {
			pointSBut.setPoint(new Position());
			butDown = 20;
		} else {
			pointSBut.x = this.parent.x;
			pointSBut.y = this.parent.y;

			// pointSBut.setPoint(this.position);
		}
		pointS.set(pl102.global.x, pl102.global.y);
		rectDin.setRect(self._rectangle);
		self.centerPoint.x = self.rectangle.p.x;
		self.centerPoint.y = self.rectangle.p.y;
		globPoint = self.content1.toGlobal(self.centerPoint);
		localDown = self.content1.toLocal(pl102.global);
		angelStart = calc.getAngle(globPoint, pointS);

		startRotation = self.rectangle.angel;

		self.chekOppositeCenter(this.name);
		self.positAbcolut();

		if (self.funMouseDown) self.funMouseDown();


		if (pl102.isMouseEvents) {
			pl102.stage.off('mousemove', self.stageMove);
			pl102.stage.on('mousemove', self.stageMove);
		}

		if (pl102.isTouchEvents) {
			pl102.stage.off('touchmove', self.stageMove);
			pl102.stage.on('touchmove', self.stageMove);
		}
		self.startMouse();

	};
	this.startMouse = function () {
		if (self.okUp == false) {
			self.okUp = true;
		}
		if (pl102.isMouseEvents) {
			pl102.stage.off('mouseup', self.stageUp);
			pl102.stage.on('mouseup', self.stageUp);
		}

		if (pl102.isTouchEvents) {
			pl102.stage.off('touchend', self.stageUp);
			pl102.stage.on('touchend', self.stageUp);
		}

	};


	this.contentM.interactive = true;

	if (pl102.isMouseEvents) {
		this.contentM.on('mousedown', this.funDown);
	}
	if (pl102.isTouchEvents) {
		this.contentM.on('touchstart', this.funDown);
	}
	this.contentM.name = 20;

	this.startAlphaBtnRot = 0.2;

	this.buttonDragAll = new ButtonDragAll(this);

	this.content.addChild(this.contentM);

	var ppp = new Position();
	var ddd;
	this.draw102 = function () {

		this.updateCursor();

		this.content.position.x = this._rectangle.p.x;
		this.content.position.y = this._rectangle.p.y;
		this.content.rotation = this._rectangle.angel;

		if (this._boolFont == true && this._interactive) {
			this.contentM.hitArea = this.rectArea;
			// this.graphics.beginFill(pl102.color1, 0.2);
		} else {
			this.contentM.hitArea = null;
		}

		this.rectArea.x = this._rectangle.x; // + this.wh / this._mashtab / 2;
		this.rectArea.y = this._rectangle.y; // + this.wh / this._mashtab / 2;
		this.rectArea.width = this._rectangle.width; //- this.wh / this._mashtab;
		this.rectArea.height = this._rectangle.height; // - this.wh / this._mashtab;
		this.drawBut();

		this.drawGraph102();
		ddd = calc.getDistance(this.buttonDragAll.array[0], pointNull);


		calc.getVector(ddd, -this.content.rotation, ppp);
		this.contentPoint.position.x = ppp.x;
		this.contentPoint.position.y = ppp.y;
		this.contentPoint.rotation = -this.content.rotation;

		this.contentPlus.rotation = -this.content.rotation;
		// this.contentPlus.position.x=this._rectangle.x;
		// this.contentPlus.position.y=this._rectangle.y;
		this.positAbcolut();
		this.distanceRotation.draw(this.rectAbsolut);
	};

	this.drawGraph102 = function () {
		this.graphics.clear();
		if (this._otstupKrai != 0) {
			this.graphics.beginFill(pl102.color1, 0.4);
			this.graphics.drawRect(this._rectangle.x - this._otstupKrai, this._rectangle.y - this._otstupKrai, this._rectangle.width + this._otstupKrai * 2, this._otstupKrai);
			this.graphics.drawRect(this._rectangle.x - this._otstupKrai, this._rectangle.y + this._rectangle.height, this._rectangle.width + this._otstupKrai * 2, this._otstupKrai);

			this.graphics.drawRect(this._rectangle.x - this._otstupKrai, this._rectangle.y, this._otstupKrai, this._rectangle.height);
			this.graphics.drawRect(this._rectangle.x + this._rectangle.width, this._rectangle.y, this._otstupKrai, this._rectangle.height);
			this.graphics.endFill();
		}

		if (this.backGround !== null) this.graphics.beginFill(this.backGround, 0.5);
		if (this.isKontur) {

			this.graphics.lineStyle(1 / this._mashtab, pl102.color1, 1);
			this.graphics.drawRect(this._rectangle.x, this._rectangle.y, this._rectangle.width, this._rectangle.height);
		}

	};


	this.drawBut = function () {
		// изменение размеров кнопок управления
		// кнопки с верху
		this.buttonDragAll.drawBut();
	};

	if (_boolKrai != undefined) this.boolKrai = _boolKrai;


	this.visiBtn = function (tipBtn, _visible) {
		this.buttonDragAll.visiBtn(tipBtn, _visible);
	};
	/**
     * Изминение картинок у кнопок управления
     * @param {Number} _tipBtn - номер кнопки управления.
     * @param {String} _link - основная картинка.
     * @param {String} _link1 - отображаетса при наведении на кнопку.
    */
	this.loadImgForBtnControl = function (_tipBtn, _link, _link1) {
		this.buttonDragAll.loadImgForBtnControl(_tipBtn, _link, _link1);
	};
	// ставит центр
	// p.x - 0.5 - ценрт по x
	// p.y - 0.5 - ценрт по y
	// _bool если не ундеф то событие не передаються
	this.setCenter = function (p, _bool) {
		if (_bool != undefined) this.okSob = false;
		this.pivot = p || this.pivot;
		if (butDown == 20) {
			pointSBut.setPoint(new Position());
		} else {
			for (var i = 0; i < this.buttonDragAll.array.length; i++) {
				if (this.buttonDragAll.array[i].name == butDown) {
					pointSBut.setPoint(this.buttonDragAll.array[i]);
					break;
				}
			}
		}


		rectDin.setRect(self._rectangle);


		this.center.x = (self.rectangle.x + self.rectangle.width / 2);
		this.center.y = (self.rectangle.y + self.rectangle.height / 2);
		self.zdvig('korectC', this.center); // здвигаем в ноль
		rectDin.setRect(self._rectangle);

		this.pivotDrag.x = -self.rectangle.width / 2 + self.rectangle.width * (this.pivot.x);
		this.pivotDrag.y = -self.rectangle.height / 2 + self.rectangle.height * (this.pivot.y);
		self.zdvig('korectC', this.pivotDrag); // здвигаем относительно px, py
		pointS.set(pl102.global.x, pl102.global.y);
		rectDin.setRect(self._rectangle);
		this.centerPoint.x = self.rectangle.p.x;
		this.centerPoint.y = self.rectangle.p.y;
		globPoint = self.content1.toGlobal(this.centerPoint);
		angelStart = calc.getAngle(globPoint, pointS);
		localDown = self.content1.toLocal(pl102.global);
		if (butDown == 20) {
			pointSBut.setPoint(new Position());
		} else {
			for (var i = 0; i < this.buttonDragAll.array.length; i++) {
				if (this.buttonDragAll.array[i].name == butDown) {
					pointSBut.setPoint(this.buttonDragAll.array[i]);
				}
			}
		}
		if (_bool != undefined) this.okSob = true;
	};


	// обновление курсоров
	this.updateCursor = function () {
		this.buttonDragAll.updateCursor();
	};


	this.wh = 10;
	this.wh2 = 40;
	this.interactive = true;
}

PLDragObject.prototype = {

	set minDrag (v) {
		this._minDrag = v;
		this.minDragH = v;
		this.minDragW = v;
		this.scaleDebag = 1;
	},
	get minDrag () {
		return this._minDrag;
	},


	set mashtab (v) {
		if (this._mashtab == v) return;
		this._mashtab = v;
		if (this._parent == undefined) return;
		this.buttonDragAll.mashtab = v;
		this.distanceRotation.mashtab = v;
		this.drawGraph102();
	},
	get mashtab () {
		return this._mashtab;
	},

	set parent (v) {
		if (v == undefined) { if (this._parent == undefined) return; }
		if (v == undefined) {
			if (this._parent != undefined) {
				if (this.debug == true) this._parent.removeChild(this.graphics2);
				this._parent.removeChild(this.content1);
			}
		}
		this._parent = v;
		if (v != undefined) {
			v.addChild(this.content1);
			if (this.debug == true) v.addChild(this.graphics2);
			this.positAbcolut();
			this.buttonDragAll.mashtab = this._mashtab;
			this.distanceRotation.mashtab = this._mashtab;
		}
		this.draw102();
	},
	get parent () {
		return this._parent;
	},

	set rectangle (v) {
		// this._rectangle = new Rectangle();
		this._rectangle.x = v.x;
		this._rectangle.y = v.y;
		this._rectangle.width = v.width;
		this._rectangle.height = v.height;
		this._rectangle.p.x = v.p.x;
		this._rectangle.p.y = v.p.y;
		this._rectangle.angel = v.angel;
		/* this._rectangle=v; */
		this._scaleRect = 1;

		this.bw = this.rectangle.width;
		this.bh = this.rectangle.height;
		this.bx = this.rectangle.x;
		this.by = this.rectangle.y;


		if (this.uniformScaling) {
			this.aspectRatio = this.bw / this.bh;
		}


		this.draw102();
		this.positAbcolut();
	},
	get rectangle () {
		return this._rectangle;
	},

	set boolKrai (v) {
		this._boolKrai = v;
	},
	get boolKrai () {
		return this._boolKrai;
	},

	set scaleRect (v) {
		if (this._scaleRect == v) return;
		this._scaleRect = v;

		this._rectangle.x = this.bx * v;
		this._rectangle.width = this.bw * v;

		this._rectangle.y = this.by * v;
		this._rectangle.height = this.bh * v;

		this.draw102();

	},
	get scaleRect () {
		return this._scaleRect;
	},

	set angel (v) {
		this._angel = v;
		this.rectangle.angel = this._angel;
		this.draw102();
	},
	get angel () {
		return this._angel;
	},

	set normDrag (v) {

		if (this._normDrag == v) return;
		this._normDrag = v;
		this.buttonDragAll.normDrag = v;
		this.butRot = this.butRot;
		this.mashtab = this._mashtab;
		this.draw102();

	},
	get normDrag () {
		return this._normDrag;
	},

	set butRot (v) { // butRot-есть или нет кнопки для поворота.
		this._butRot = v;
		this.buttonDragAll.butRot = v;

	},
	get butRot () {
		return this._butRot;
	},

	set widthNot (v) { // widthNot-false при true нельзя из под изменять ширину.
		this._widthNot = v;

	},
	get widthNot () {
		return this._widthNot;
	},

	set heightNot (v) { // heightNot-false при true нельзя из под изменять высоту.
		this._heightNot = v;

	},
	get heightNot () {
		return this._heightNot;
	},

	set interactive (v) { // interactive - таскание таскалки
		this._interactive = v;
		this.contentM.interactive = v;
		this.contentM.visible = v;

	},
	get interactive () {
		return this.contentM.interactive;
	},

	set boolFont (v) {
		if (this._boolFont == v) return;
		this._boolFont = v;
		this.draw102();
	},
	get boolFont () {
		return this._boolFont;
	},

	set wh2 (v) { //
		if (this._wh2 == v) return;
		this._wh2 = v;
		this.drawBut();
	},
	get wh2 () {
		return this._wh2;
	},

	set wh (v) { //
		if (this._wh == v) return;
		this._wh = v;
		this.drawBut();
	},
	get wh () {
		return this._wh;
	},
	set uniformScaling (v) { //
		if (this._uniformScaling == v) return;
		this._uniformScaling = v;
	},
	get uniformScaling () {
		return this._uniformScaling;
	},
	set oppositeCenter (v) { //
		if (this._oppositeCenter == v) return;
		this._oppositeCenter = v;
	},
	get oppositeCenter () {
		return this._oppositeCenter;
	},

	set upBtnRot (v) {
		this._upBtnRot = v;
		// поднятие кнопок
		this.buttonDragAll.upBtnRot = v;
	},
	get upBtnRot () {
		return this._upBtnRot;
	},

	set otstupKrai (v) { //
		if (this._otstupKrai == v) return;
		this._otstupKrai = v;
		this.draw102();
	},
	get otstupKrai () {
		return this._otstupKrai;
	},

	set distRot (v) {
		if (this._distRot == v) return;
		this._distRot = v;
		this.distanceRotation.activ = this._distRot;
	},
	get distRot () {
		return this._distRot;
	}
};

function ButtonDragAll (_dragObject) {
	this._wh = 10;
	this._wh2 = 10;
	this._normDrag = 'null';
	this.array = [];
	this._mashtab = 1;
	this.dragObject = _dragObject;
	this.content = new PIXI.Container();
	_dragObject.content.addChild(this.content);
	var pointNull = new Position();
	this._butRot = true;

	this.arrCursorLink = [
		'url("resources/images/cursor/1.png") 8 8, auto',
		'url("resources/images/cursor/2.png") 8 8, auto',
		'url("resources/images/cursor/3.png") 8 8, auto',
		'url("resources/images/cursor/4.png") 8 8, auto'
	];
	this.arrCursorLink1 = [
		'url("resources/images/cursor/5.png") 8 8, auto',
		'url("resources/images/cursor/6.png") 8 8, auto',
		'url("resources/images/cursor/7.png") 8 8, auto',
		'url("resources/images/cursor/8.png") 8 8, auto'
	];
	this.arrCursorLink2 = [
		'url("resources/images/cursor/9.png") 8 8, auto'
	];


	for (var i = 0; i < 9; i++) {
		this.array[i] = new ButtonDragBlok(this, this.content, i, _dragObject.funDown);
	}
	this.array[4].content.visible = false;
	this.array[3].side = 1;
	this.array[5].side = -1;

	var zzz = 1;
	// изменения ректа подстраиваем кнопки
	this.drawBut = function () {
		// позиционирование кнопок управление

		this.array[4].x = 0;
		this.array[4].y = 0;

		this.array[0].x = this.array[3].x = this.array[6].x = _dragObject._rectangle.x;
		this.array[1].x = this.array[7].x = _dragObject._rectangle.x + _dragObject._rectangle.width / 2;
		this.array[2].x = this.array[5].x = this.array[8].x = _dragObject._rectangle.x + _dragObject._rectangle.width;

		this.array[0].y = this.array[1].y = this.array[2].y = _dragObject._rectangle.y;
		this.array[3].y = this.array[5].y = _dragObject._rectangle.y + _dragObject._rectangle.height / 2;
		this.array[6].y = this.array[7].y = this.array[8].y = _dragObject._rectangle.y + _dragObject._rectangle.height;

	};

	this.activBat = function (num) {
		for (var i = 0; i < 9; i++) {
			if ((num == i) || (num - 10 == i)) this.array[i].activ = true;
			else this.array[i].activ = false;
		}
	};

	this.visiBtn = function (tipBtn, _visible) {
		this.array[tipBtn].content.visible = _visible;
	};
	/**
     * Изминение картинок у кнопок управления
     * @param {Number} _tipBtn - номер кнопки управления.
     * @param {String} _link - основная картинка.
     * @param {String} _link1 - отображаетса при наведении на кнопку.
    */
	this.loadImgForBtnControl = function (_tipBtn, _link, _link1) {
		this.array[_tipBtn].setLinks(_link, _link1);
	};

	var a, angel, tip;
	var tipOld = -1;
	this.updateCursor = function () {

		for (var i = 0; i < 9; i++) {
			this.array[i].mashtab = this._mashtab;
		}

		a = calc.getAngle2(this.array[3].content.toGlobal(pointNull), this.array[5].content.toGlobal(pointNull));

		angel = Math.floor((a * calc.RAD2DEG) % 360);
		if (angel < 0) angel += 360;
		tip = Math.floor(angel / (360 / 16));
		this.drawBut();
		if (tipOld == tip) return;
		tipOld = tip;

		if (tip == 15 || tip == 0 || tip == 7 || tip == 8) {
			this.array[0].graphics2.defaultCursor = this.array[8].graphics2.defaultCursor = this.arrCursorLink[1];
			this.array[2].graphics2.defaultCursor = this.array[6].graphics2.defaultCursor = this.arrCursorLink[0];
			this.array[3].graphics2.defaultCursor = this.array[5].graphics2.defaultCursor = this.arrCursorLink1[2];
			this.array[1].graphics2.defaultCursor = this.array[7].graphics2.defaultCursor = this.arrCursorLink1[3];
		} else if (tip == 1 || tip == 2 || tip == 9 || tip == 10) {
			this.array[0].graphics2.defaultCursor = this.array[8].graphics2.defaultCursor = this.arrCursorLink[3];
			this.array[2].graphics2.defaultCursor = this.array[6].graphics2.defaultCursor = this.arrCursorLink[2];
			this.array[3].graphics2.defaultCursor = this.array[5].graphics2.defaultCursor = this.arrCursorLink1[1];
			this.array[1].graphics2.defaultCursor = this.array[7].graphics2.defaultCursor = this.arrCursorLink1[0];
		} else if (tip == 3 || tip == 4 || tip == 11 || tip == 12) {
			this.array[0].graphics2.defaultCursor = this.array[8].graphics2.defaultCursor = this.arrCursorLink[0];
			this.array[2].graphics2.defaultCursor = this.array[6].graphics2.defaultCursor = this.arrCursorLink[1];
			this.array[3].graphics2.defaultCursor = this.array[5].graphics2.defaultCursor = this.arrCursorLink1[3];
			this.array[1].graphics2.defaultCursor = this.array[7].graphics2.defaultCursor = this.arrCursorLink1[2];
		} else if (tip == 5 || tip == 6 || tip == 13 || tip == 14) {
			this.array[0].graphics2.defaultCursor = this.array[8].graphics2.defaultCursor = this.arrCursorLink[2];
			this.array[2].graphics2.defaultCursor = this.array[6].graphics2.defaultCursor = this.arrCursorLink[3];
			this.array[3].graphics2.defaultCursor = this.array[5].graphics2.defaultCursor = this.arrCursorLink1[0];
			this.array[1].graphics2.defaultCursor = this.array[7].graphics2.defaultCursor = this.arrCursorLink1[1];
		}


	};


}
ButtonDragAll.prototype = {
	set mashtab (v) {
		if (this._mashtab == v) return;
		this._mashtab = v;
		for (var i = 0; i < 9; i++) {
			this.array[i].mashtab = this._mashtab;
		}
	},
	get mashtab () {
		return this._mashtab;
	},
	set normDrag (v) {

		if (this._normDrag == v) return;
		this._normDrag = v;

		for (var i = 0; i < 9; i++) {
			this.visiBtn(i, false);
		}

		switch (v) {
			case 'norm': { // ”norm”-остаются только 4 кнопки.
				this.visiBtn(0, true);
				this.visiBtn(2, true);
				this.visiBtn(6, true);
				this.visiBtn(8, true);
				break;
			}
			case 'null': { // ”null”-все кроме большой контурной кнопки подложки пропадают.
				break;
			}
			case 'norm-width': { // ”norm-width”-остаются только 2 кнопки.
				this.visiBtn(3, true);
				this.visiBtn(5, true);
				break;
			}
			case 'norm-w-h-leftCorner':	{ // ”norm-w-h-leftCorner” - 4 по центру на каждой грани и 1 в левом нижнем углу
				this.visiBtn(1, true);
				this.visiBtn(3, true);
				this.visiBtn(5, true);
				this.visiBtn(6, true);
				this.visiBtn(7, true);
				break;
			}
			default: { // по умолчанию видны все кроме центральной
				for (var i = 0; i < 9; i++) {
					this.visiBtn(i, true);
				}
				this.visiBtn(4, false);
			}
		}
		var m = this._mashtab;
		this._mashtab = 88;
		this.mashtab = m;

	},
	get normDrag () {
		return this._normDrag;
	},

	set butRot (v) { // butRot-есть или нет кнопки для поворота.
		if (this._butRot == v) return;
		this._butRot = v;

		for (var i = 0; i < 9; i++) {
			this.array[i].graphics.visible = v;
		}


	},
	get butRot () {
		return this._butRot;
	},
	set upBtnRot (v) {

		if (this._upBtnRot == v) return;

		this._upBtnRot = v;

		// поднятие кнопок
		for (var i = 0; i < 9; i++) {
			this.array[i].graphics2.visible = !v;
		}
		// this.content.addChild(this.contentM2);

	},
	get upBtnRot () {
		return this._upBtnRot;
	}

};

function ButtonDragBlok (_BDA, _cont, _name, _fun) {
	var self = this;

	this.BDA = _BDA;
	this.fun = _fun;

	this.content = new PIXI.Container();
	_cont.addChild(this.content);

	this.contentBtn = new PIXI.Container();
	this.content.addChild(this.contentBtn);

	this.button = new PLButton(this.contentBtn, 0, 0, '', this.fun);
	this.button.name = _name;
	this.button.width = this.BDA._wh;
	this.button.height = this.BDA._wh;

	this._x = 0;
	this._y = 0;
	/** Переключение между кнопками  button и button1, если button1 не создана сеттер не сработает */
	this._isDubBtn = false;

	this.name = _name;

	this.side = 0; // сторона считаестя смещение от центра. работает только когда BDA._normDrag == norm-width
	this._activ = false; //

	this._mashtab = 1;
	this.graphics = new PIXI.Graphics(); // на ней курсор поворота
	this.graphics2 = new PIXI.Graphics(); // на ней курсор растягивания

	this.contentG = new PIXI.Container();// контейнер для графиков (на нем события актива)
	this.content.addChild(this.contentG);
	this.contentG.addChild(this.graphics);
	this.contentG.addChild(this.graphics2);

	this.graphics.defaultCursor = this.BDA.arrCursorLink2[0];
	this.graphics.name = _name + 10;

	this.graphics2.defaultCursor = this.BDA.arrCursorLink[0];
	this.graphics2.name = _name;

	addEvent(this.graphics);
	addEvent(this.graphics2);

	this.button1 = null;
	/**
     * Изминение картинок у кнопок управления
     * @param {String} _link - основная картинка.
     * @param {String} _link1 - отображаетса при наведении на кнопку.
    */
	this.setLinks = function(_link, _link1) {

		if (this.button1 === null) {
			this.button1 = new PLButton(this.contentBtn, 0, 0, '', this.fun);
			this.button1.name = _name;
			this.button1.visible = false;
		}

		// видимая панель кнопки
		if (_link) this.button1.panel.link = _link;
		// панель при наведении мыши
		if (_link1) this.button1.panel1.link = _link1;
	};

	this.mouseOut = function (e) {

		if (self._activ === true) return;

		if (self._isDubBtn === true) self.button1.activ = false;
		else self.button.activ = false;
	};

	this.mouseOver = function (e) {
		
		if (self._isDubBtn === true) self.button1.activ = true;
		else self.button.activ = true;
	};

	this.contentG.interactive = true;
	if (pl102.isMouseEvents) {
		this.contentG.on('mouseout', this.mouseOut);
		this.contentG.on('mouseover', this.mouseOver);
	}

	function addEvent (g) {

		g.interactive = true;
		g.buttonMode = true;

		if (pl102.isMouseEvents) {
			g.on('mousedown', self.fun);
		}

		if (pl102.isTouchEvents) {
			g.on('touchstart', self.fun);
		}
	}

	var maxSize;
	this.draw = function () { // перерисовка график кнопки

		// размер кнопки относительно масштаба
		var _mm = Math.min((this.BDA._wh) / this.BDA._mashtab, 20);

		this.graphics.clear();// при BDA._normDrag == 'norm-width' graphics не рисуется (графика для поворота)
		this.graphics2.clear();
		this.graphics.beginFill(0, 0.0);
		this.graphics2.beginFill(0xff0000, 0.0);

		if (this.BDA._normDrag == 'norm-width') {
			var offsetSide = (this.side * this.button.width / 2);// смещение от центра
			maxSize = Math.min(this.BDA.dragObject._rectangle.width, this.BDA.dragObject._rectangle.height) / 2;

			this.button.width = Math.min(_mm, maxSize); // BDA._wh2
			this.button.height = this.BDA.dragObject._rectangle.height;
			this.button.position.set(-this.button.width / 2 + offsetSide, -this.button.height / 2);

			if (this.button1 !== null) {
				this.button1.width = Math.min(_mm, maxSize); // BDA._wh2
				this.button1.height = this.BDA.dragObject._rectangle.height;
				this.button1.position.set(-this.button.width / 2 + offsetSide, -this.button.height / 2);
			}

			var otstup = 10 / this.BDA._mashtab;

			this.graphics2.drawRect(
				this.button.x - (this.side === 1 ? otstup : 0),
				this.button.y - otstup,
				this.button.width + otstup,
				this.button.height + otstup * 2
			);

			this.isDubBtn = true;

			return;
		} else {
			this.isDubBtn = false;
		}

		this.button.width = this.button.height = _mm;
		this.button.position.set(-this.button.width / 2, -this.button.height / 2);

		// максимальный размер графиков что б они не пересикались с друг другом
		maxSize = Math.min(this.BDA.dragObject._rectangle.width, this.BDA.dragObject._rectangle.height) / 4;

		// размер графиков они больше кнопки но не больше maxSize
		var _mmm = Math.min(_mm * 3, maxSize);

		this.graphics.drawCircle(0, 0, _mmm);
		this.graphics2.drawCircle(0, 0, _mmm * 0.45);

	};


	this.draw();
}
ButtonDragBlok.prototype = {

	set activ (v) {
		if (this._activ == v) return;
		this._activ = v;
		this.button.activ = v;
	},
	get activ () {
		return this._activ;
	},

	set x (v) {
		this._x = v;
		this.content.x = v;
	},
	get x () {
		return this._x;
	},
	set y (v) {
		this._y = v;
		this.content.y = v;
	},
	get y () {
		return this._y;
	},
	set mashtab (v) {
		if (v == undefined) return;
		this._mashtab = v;
		this.draw();
	},
	get mashtab () {
		return this._mashtab;
	},

	set isDubBtn (v) {
		if (this.button1 === null) return;
		if (this._isDubBtn === v) return;
		this._isDubBtn = v;

		this.button.visible = !this._isDubBtn;
		this.button1.visible = this._isDubBtn;
	},
	get isDubBtn () {
		return this._isDubBtn;
	}
};


function TestPLDragObject (cont, x, y) {
	PIXI.Container.call(this);
	cont.addChild(this);
	this.x = x || 0;
	this.y = y || 0;

	var pXDragObject = new PLDragObject();

	pXDragObject.parent = cont;

	var panel = new PLWindow(this, 0, 0, 'TestPLDragObject');
	panel.hasMinimizeButton = true;
	// panel.minimize = true;
	panel.width = 150;
	var arrSlid = [];
	var i = 1;
	var x = 5;

	arrSlid[0] = new PLSliderBig(panel.content, x, 2, 'wh', fromName);
	arrSlid[1] = new PLSliderBig(panel.content, x, (25 + 2) * i++, 'wh2', fromName);
	// arrSlid[2] = new PLSliderBig(panel.content, x, (25 + 2) * i++, 'scaleBtnConturCenter', fromName);
	// arrSlid[3] = new PLSliderBig(panel.content, x, (25 + 2) * i++, 'visiTip', fromName);

	// arrSlid[4] = new PLSliderBig(panel.content, x, (25 + 2) * i++, 'visiTip2', fromName);


	// arrSlid[4].min = arrSlid[3].min = 0;
	// arrSlid[4].max = arrSlid[3].max = 1;


	// arrSlid[2].min = 0.0001;
	// arrSlid[2].max = 2;

	// arrSlid[4].okrug = arrSlid[3].okrug = 1;

	// var btn = new PLButton(panel.content, x, (25 + 2) * i++, 'hideRot.false', fromName1);
	// btn.width = panel.width - x * 2;
	// btn.value = false
	// btn._title = 'hideRot';
	// var btn = new PLButton(panel.content, x, (25 + 2) * i++, 'hideRot.true', fromName1);
	// btn.width = panel.width - x * 2;
	// btn.value = true
	// btn._title = 'hideRot';

	// arrSlid[5] = new PLSliderBig(panel.content, x, (25 + 2) * i++, 'offsetHit', fromName);


	arrSlid[6] = new PLSliderBig(panel.content, x, (25 + 2) * i++, 'minDrag', fromName);

	var btn = new PLButton(panel.content, x, (25 + 2) * i++, 'normDrag.norm', fromName1);
	btn.width = panel.width - x * 2;
	btn._title = 'normDrag';
	btn.value = "'norm'";
	var btn = new PLButton(panel.content, x, (25 + 2) * i++, 'normDrag.null', fromName1);
	btn.width = panel.width - x * 2;
	btn.value = "'null'";
	btn._title = 'normDrag';
	var btn = new PLButton(panel.content, x, (25 + 2) * i++, 'normDrag.norm-width', fromName1);
	btn.width = panel.width - x * 2;
	btn.value = "'norm-width'";
	btn._title = 'normDrag';
	var btn = new PLButton(panel.content, x, (25 + 2) * i++, 'normDrag.default', fromName1);
	btn.width = panel.width - x * 2;
	btn.value = "'default'";
	btn._title = 'normDrag';
	var btn = new PLButton(panel.content, x, (25 + 2) * i++, 'butRot.false', fromName1);
	btn.width = panel.width - x * 2;
	btn.value = false;
	btn._title = 'butRot';
	var btn = new PLButton(panel.content, x, (25 + 2) * i++, 'butRot.true', fromName1);
	btn.width = panel.width - x * 2;
	btn.value = true;
	btn._title = 'butRot';

	var btn = new PLButton(panel.content, x, (25 + 2) * i++, 'uniformScaling.false', fromName1);
	btn.width = panel.width - x * 2;
	btn.value = false;
	btn._title = 'uniformScaling';
	var btn = new PLButton(panel.content, x, (25 + 2) * i++, 'uniformScaling.true', fromName1);
	btn.width = panel.width - x * 2;
	btn.value = true;
	btn._title = 'uniformScaling';

	var btn = new PLButton(panel.content, x, (25 + 2) * i++, 'oppositeCenter.false', fromName1);
	btn.width = panel.width - x * 2;
	btn.value = false;
	btn._title = 'oppositeCenter';
	var btn = new PLButton(panel.content, x, (25 + 2) * i++, 'oppositeCenter.true', fromName1);
	btn.width = panel.width - x * 2;
	btn.value = true;
	btn._title = 'oppositeCenter';

	var btn = new PLButton(panel.content, x, (25 + 2) * i++, 'upBtnRot.false', fromName1);
	btn.width = panel.width - x * 2;
	btn.value = false;
	btn._title = 'upBtnRot';
	var btn = new PLButton(panel.content, x, (25 + 2) * i++, 'upBtnRot.true', fromName1);
	btn.width = panel.width - x * 2;
	btn.value = true;
	btn._title = 'upBtnRot';

	arrSlid.forEach(function (p) {
		p.width = panel.width - x * 2;
	});

	function fromName () {
		var arrName = this._title.split('.');

		// StairsLine3D[this._title] = this.value;
		var comand = 'pXDragObject';
		for (var i = 0; i < arrName.length; i++) {
			comand += "['" + arrName[i] + "']";
		}
		comand += ('=' + this.value);

		eval(comand);

	}

	function fromName1 () {
		var str = this._title;
		var arrName = str.split('.');

		// StairsLine3D[this._title] = this.value;
		var comand = 'pXDragObject';
		for (var i = 0; i < arrName.length; i++) {
			comand += '.' + arrName[i] + '';
		}
		comand += ('=' + this.value);

		eval(comand);

	}


	panel.height = (25 + 2) * i++;

}

TestPLDragObject.prototype = Object.create(PIXI.Container.prototype);
TestPLDragObject.prototype.constructor = TestPLDragObject;

function DistanceRotation (container, fun) {
	var self = this;
	this.type = 'DistanceRotation';

	this.fun = fun;

	this.content = new PIXI.Container();
	container.addChild(this.content);

	this.graphics = new PIXI.Graphics();
	this.content.addChild(this.graphics);

	this._mashtab = 1;
	this._activ = false;

	this.content.visible = this._activ;

	this.angel = 0;
	this.color = pl102.color1;
	/** Толщина линии */
	this.lineTricknes = 1;
	/** Размер выностной кнопки */
	this.btnWH = 20;
	/** Растояние на которое выноситься кнопка */
	this._distBtn = 80;
	this.distMoveBtn = 0;

	this.btn = new PLButton(this.content, 0, 0, '', onDown);
	this.btn.width = this.btnWH;
	this.btn.height = this.btnWH;
	this.btn.funOver = function () {
		this.activ = true;
		this.graphInter.defaultCursor = 'url("resources/images/cursor/9.png") 8 8, auto';
	};
	this.btn.funOut = function () {
		this.activ = isDown;
		this.graphInter.defaultCursor = 'default';
	};

	var pointDown = new PIXI.Point();
	var downLocal = new PIXI.Point();
	var moveLocal = new PIXI.Point();
	var vector = new PIXI.Point();
	var poinDistRot = new PIXI.Point();
	var pointMove = new PIXI.Point();
	var offsetRot = 90 * calc.DEG2RAD;
	var isDown = false;

	function onDown () {
		isDown = true;
		pl102.interaction.isNotChangeCursorMouseOverOut = true;
		downLocal = self.content.toLocal(pl102.global);
		pointDown.x = self.btn.position.x;
		pointDown.y = self.btn.position.y;
		pl102.stage.off('mousemove', onMove);
		pl102.stage.off('mouseup', onUp);
		pl102.stage.on('mousemove', onMove);
		pl102.stage.on('mouseup', onUp);
		if (self.funDown) self.funDown();
	}

	function onMove (e) {
		var p = pl102.global;
		if (e instanceof MouseEvent) p.set(e.clientX, e.clientY);
		moveLocal = self.content.toLocal(p);
		vector.set(moveLocal.x - downLocal.x, moveLocal.y - downLocal.y);
		pointMove.x = pointDown.x + vector.x;
		pointMove.y = pointDown.y + vector.y;
		self.btn.position.set(pointMove.x, pointMove.y);
		self.drawLine();
		self.angel = calc.getAngle(self.pointCenter, self.btn.position) + offsetRot;
		self.distMoveBtn = calc.getDistance(self.pointCenter, pointMove);
		self.btn.rotation = self.angel;
		if (self.fun) self.fun();
	}

	function onUp () {
		isDown = false;
		self.distMoveBtn = 0;
		self.btn.funOut();
		pl102.interaction.isNotChangeCursorMouseOverOut = false;
		pl102.stage.off('mousemove', onMove);
		pl102.stage.off('mouseup', onUp);
		if (self.fun) self.fun();
		if (self.funUp) self.funUp();
	}

	this.pointCenter = new PIXI.Point();
	this.draw = function (rectangle) {
		rectangle = rectangle || this.rectangle;
		this.rectangle = rectangle;
		if (!this._activ) return;
		if (!rectangle) return
		this.angel = rectangle.angel;

		this.pointCenter.set(rectangle.p.x + rectangle.width / 2, rectangle.p.y + rectangle.height / 2);
		calc.rotationPoint(this.pointCenter, this.angel, rectangle.p);

		var offsetPosY = (self.distMoveBtn || (rectangle.height / 2 + this.distBtn));
		poinDistRot.set(this.pointCenter.x, this.pointCenter.y - offsetPosY);

		calc.rotationPoint(poinDistRot, this.angel, this.pointCenter);

		this.btn.position.set(poinDistRot.x, poinDistRot.y);
		this.btn.rotation = this.angel;

		this.updateBtnFromMashtab();
		this.drawLine();
	};

	this.drawLine = function () {
		var trick = this.lineTricknes / this._mashtab;
		this.graphics.clear();
		this.graphics.lineStyle(trick, this.color, 1);
		this.graphics.moveTo(this.pointCenter.x, this.pointCenter.y);
		this.graphics.lineTo(this.btn.position.x, this.btn.position.y);
		this.graphics.endFill();
	};

	this.updateBtnFromMashtab = function () {
		var wh = Math.min((this.btnWH) / this._mashtab, 20);
		this.btn.width = wh;
		this.btn.height = wh;
		this.btn.pivot.set(this.btn.width / 2, this.btn.height / 2);
	};

	this.setLinks = function (_link, _link1) {
		// видимая панель кнопки
		if (_link) this.btn.panel.link = _link;
		// панель при наведении мыши
		if (_link1) this.btn.panel1.link = _link1;
	};
}

DistanceRotation.prototype = {

	set distBtn (v) {
		if (this._distBtn === v) return;
		this._distBtn = v;
		this.draw();
	},
	get distBtn () {
		return this._distBtn;
	},
	set activ (v) {
		if (this._activ === v) return;
		this._activ = v;
		this.content.visible = this._activ;
	},
	get activ () {
		return this._activ;
	},

	set mashtab (v) {
		if (this._mashtab === v) return;
		this._mashtab = v;
		this.updateBtnFromMashtab();
		this.drawLine();
	},
	get mashtab () {
		return this._mashtab;
	}
};


function DistanceRotationCircle (container, fun) {
	var self = this;
	this.type = 'DistanceRotationCircle';

	this.fun = fun;

	this.content = new PIXI.Container();
	container.addChild(this.content);

	this.graphics = new PIXI.Graphics();
	this.content.addChild(this.graphics);

	this._mashtab = 1;
	this._activ = false;

	this.content.visible = this._activ;

	this.wh = 30;
	this.angel = 0;
	this.color = pl102.color1;
	/** Толщина линии */
	this.lineTricknes = 1;
	/** Размер выностной кнопки */
	this.btnWH = 20;
	/** Растояние на которое выноситься кнопка */
	this._distBtn = 80;
	this.distMoveBtn = 0;

	this.btn = new PLArrButtonIcon(this.content);
	this.btn.mashtab = this._mashtab;
	this.btn.plusIcon('name', undefined, this.wh);

	var pointDown = new PIXI.Point();
	var downLocal = new PIXI.Point();
	var moveLocal = new PIXI.Point();
	var vector = new PIXI.Point();
	var poinDistRot = new PIXI.Point();
	var pointMove = new PIXI.Point();
	var offsetRot = 90 * calc.DEG2RAD;
	var isDown = false;


	this.btn.funDown = function onDown () {
		isDown = true;
		pl102.interaction.isNotChangeCursorMouseOverOut = true;
		downLocal = self.content.toLocal(pl102.global);
		pointDown.x = self.btn.position.x;
		pointDown.y = self.btn.position.y;

		canDofunMove = true;
		canDofunUp = true;
		if (self.funDown) self.funDown();
	};

	this.btn.funMove = function onMove (e) {
		if (canDofunMove === false) return;

		this.color = 0xffb200;

		var p = pl102.global;
		if (e instanceof MouseEvent) p.set(e.clientX, e.clientY);
		moveLocal = self.content.toLocal(p);
		vector.set(moveLocal.x - downLocal.x, moveLocal.y - downLocal.y);
		pointMove.x = pointDown.x + vector.x;
		pointMove.y = pointDown.y + vector.y;
		self.btn.position.set(pointMove.x, pointMove.y);
		self.drawLine();
		self.angel = calc.getAngle(self.pointCenter, self.btn.position) + offsetRot;
		self.distMoveBtn = calc.getDistance(self.pointCenter, pointMove);
		self.btn.rotation = self.angel;

		if (self.fun) self.fun();
	};

	this.btn.funUp = function onUp () {
		if (canDofunUp === false) return;

		this.color = pl102.color11;

		isDown = false;
		self.distMoveBtn = 0;
		pl102.interaction.isNotChangeCursorMouseOverOut = false;
		canDofunMove = false;
		canDofunUp = false;
		if (self.fun) self.fun();
		if (self.funUp) self.funUp();
	};

	this.pointCenter = new PIXI.Point();
	this.draw = function (rectangle) {
		rectangle = rectangle || this.rectangle;
		this.rectangle = rectangle;
		if (!this._activ) return;
		if (!rectangle) return
		this.angel = rectangle.angel;

		this.pointCenter.set(rectangle.p.x + rectangle.width / 2, rectangle.p.y + rectangle.height / 2);
		calc.rotationPoint(this.pointCenter, this.angel, rectangle.p);

		var offsetPosY = (self.distMoveBtn || (rectangle.height / 2 + this.distBtn));
		poinDistRot.set(this.pointCenter.x, this.pointCenter.y - offsetPosY);

		calc.rotationPoint(poinDistRot, this.angel, this.pointCenter);

		this.btn.position.set(poinDistRot.x, poinDistRot.y);
		this.btn.rotation = this.angel;

		this.updateBtnFromMashtab();
		this.drawLine();
	};

	this.drawLine = function () {
		var trick = this.lineTricknes / this._mashtab;
		this.graphics.clear();
		this.graphics.lineStyle(trick, this.color, 1);
		this.graphics.moveTo(this.pointCenter.x, this.pointCenter.y);
		this.graphics.lineTo(this.btn.position.x, this.btn.position.y);
		this.graphics.endFill();
	};

	this.updateBtnFromMashtab = function () {
		this.btn.mashtab = this._mashtab;
	};

	this.setLinks = function (_link) {
		this.btn.link = _link;
	};
}

DistanceRotationCircle.prototype = {

	set distBtn (v) {
		if (this._distBtn === v) return;
		this._distBtn = v;
		this.draw();
	},
	get distBtn () {
		return this._distBtn;
	},
	set activ (v) {
		if (this._activ === v) return;
		this._activ = v;
		this.content.visible = this._activ;
	},
	get activ () {
		return this._activ;
	},

	set mashtab (v) {
		if (this._mashtab === v) return;
		this._mashtab = v;
		this.updateBtnFromMashtab();
		this.drawLine();
	},
	get mashtab () {
		return this._mashtab;
	}
};
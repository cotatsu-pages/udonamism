/* Generated by Opal 1.0.3 */
(function(Opal) {
  function $rb_lt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
  function $rb_gt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $send = Opal.send, $truthy = Opal.truthy;

  Opal.add_stubs(['$setPrefixes', '$match', '$to_i', '$[]', '$===', '$<', '$push', '$>', '$roll_wod', '$join', '$+', '$new', '$roll', '$sort!', '$each', '$min', '$-']);
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'WorldOfDarkness');

    var $nesting = [self].concat($parent_nesting), $WorldOfDarkness_initialize$1, $WorldOfDarkness_rollDiceCommand$2, $WorldOfDarkness_roll_wod$3;

    
    Opal.const_set($nesting[0], 'ID', "WorldOfDarkness");
    Opal.const_set($nesting[0], 'NAME', "ワールド・オブ・ダークネス");
    Opal.const_set($nesting[0], 'SORT_KEY', "わあるとおふたあくねす");
    Opal.const_set($nesting[0], 'HELP_MESSAGE', "" + "・判定コマンド(xSTn+y or xSTSn+y or xSTAn+y)\n" + "　(ダイス個数)ST(難易度)+(自動成功)\n" + "　(ダイス個数)STS(難易度)+(自動成功) ※出目10で振り足し\n" + "　(ダイス個数)STA(難易度)+(自動成功) ※出目10は2成功 [20thルール]\n" + "\n" + "　難易度=省略時6\n" + "　自動成功=省略時0\n");
    self.$setPrefixes(["\\d+ST.*"]);
    
    Opal.def(self, '$initialize', $WorldOfDarkness_initialize$1 = function $$initialize() {
      var $iter = $WorldOfDarkness_initialize$1.$$p, $yield = $iter || nil, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;

      if ($iter) $WorldOfDarkness_initialize$1.$$p = null;
      // Prepare super implicit arguments
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      
      $send(self, Opal.find_super_dispatcher(self, 'initialize', $WorldOfDarkness_initialize$1, false), $zuper, $iter);
      self.successDice = 0;
      self.botchDice = 0;
      return (self.rerollDice = 0);
    }, $WorldOfDarkness_initialize$1.$$arity = 0);
    
    Opal.def(self, '$rollDiceCommand', $WorldOfDarkness_rollDiceCommand$2 = function $$rollDiceCommand(command) {
      var $a, $b, $c, self = this, dice_pool = nil, diff = nil, auto_success = nil, enable_reroll = nil, enable_20th = nil, md = nil, $case = nil, sequence = nil, total_success = nil, total_botch = nil, dice = nil, success = nil, botch = nil, output = nil, secret = nil;

      
      dice_pool = 1;
      diff = 6;
      auto_success = 0;
      enable_reroll = false;
      enable_20th = false;
      md = command.$match(/^(\d+)(ST[SA]?)(\d+)?([+-]\d+)?/);
      dice_pool = md['$[]'](1).$to_i();
      $case = md['$[]'](2);
      if ("STS"['$===']($case)) {enable_reroll = true}
      else if ("STA"['$===']($case)) {enable_20th = true};
      if ($truthy(md['$[]'](3))) {
        diff = md['$[]'](3).$to_i()};
      if ($truthy(md['$[]'](4))) {
        auto_success = md['$[]'](4).$to_i()};
      if ($truthy($rb_lt(diff, 2))) {
        diff = 6};
      sequence = [];
      sequence.$push("" + "DicePool=" + (dice_pool) + ", Difficulty=" + (diff) + ", AutomaticSuccess=" + (auto_success));
      if ($truthy($rb_gt(diff, 10))) {
        diff = 10};
      total_success = auto_success;
      total_botch = 0;
      $b = self.$roll_wod(dice_pool, diff, true, (function() {if ($truthy(enable_20th)) {
        return 2
      } else {
        return 1
      }; return nil; })()), $a = Opal.to_ary($b), (dice = ($a[0] == null ? nil : $a[0])), (success = ($a[1] == null ? nil : $a[1])), (botch = ($a[2] == null ? nil : $a[2])), (auto_success = ($a[3] == null ? nil : $a[3])), $b;
      sequence.$push(dice.$join(","));
      total_success = $rb_plus(total_success, success);
      total_botch = $rb_plus(total_botch, botch);
      if ($truthy(enable_reroll)) {
        while ($truthy($rb_gt(auto_success, 0))) {
          
          dice_pool = auto_success;
          $c = self.$roll_wod(dice_pool, diff, false), $b = Opal.to_ary($c), (dice = ($b[0] == null ? nil : $b[0])), (success = ($b[1] == null ? nil : $b[1])), (botch = ($b[2] == null ? nil : $b[2])), (auto_success = ($b[3] == null ? nil : $b[3])), $c;
          sequence.$push(dice.$join(","));
          total_success = $rb_plus(total_success, success);
          total_botch = $rb_plus(total_botch, botch);
        }};
      if ($truthy($rb_gt(total_success, 0))) {
        sequence.$push("" + "成功数" + (total_success))
      } else if ($truthy($rb_gt(total_botch, 0))) {
        sequence.$push("大失敗")
      } else {
        sequence.$push("失敗")
      };
      output = sequence.$join(" ＞ ");
      secret = false;
      return [output, secret];
    }, $WorldOfDarkness_rollDiceCommand$2.$$arity = 1);
    return (Opal.def(self, '$roll_wod', $WorldOfDarkness_roll_wod$3 = function $$roll_wod(dice_pool, diff, enable_botch, auto_success_value) {
      var $$4, $$5, self = this, dice = nil, success = nil, botch = nil, auto_success = nil, c = nil;

      
      
      if (enable_botch == null) {
        enable_botch = true;
      };
      
      if (auto_success_value == null) {
        auto_success_value = 1;
      };
      dice = $send($$($nesting, 'Array'), 'new', [dice_pool], ($$4 = function(){var self = $$4.$$s || this, $a, $b, dice_now = nil;

      
        $b = self.$roll(1, 10), $a = Opal.to_ary($b), (dice_now = ($a[0] == null ? nil : $a[0])), $b;
        return dice_now;}, $$4.$$s = self, $$4.$$arity = 0, $$4));
      dice['$sort!']();
      success = 0;
      botch = 0;
      auto_success = 0;
      $send(dice, 'each', [], ($$5 = function(d){var self = $$5.$$s || this, $case = nil;

      
        
        if (d == null) {
          d = nil;
        };
        return (function() {$case = d;
        if ((10)['$===']($case)) {return (auto_success = $rb_plus(auto_success, auto_success_value))}
        else if (Opal.Range.$new(diff, 10, false)['$===']($case)) {return (success = $rb_plus(success, 1))}
        else if ((1)['$===']($case)) {if ($truthy(enable_botch)) {
          return (botch = $rb_plus(botch, 1))
        } else {
          return nil
        }}
        else { return nil }})();}, $$5.$$s = self, $$5.$$arity = 1, $$5));
      success = $rb_plus(success, auto_success);
      if ($truthy(enable_botch)) {
        
        c = [success, botch].$min();
        success = $rb_minus(success, c);
        botch = $rb_minus(botch, c);};
      return [dice, success, botch, auto_success];
    }, $WorldOfDarkness_roll_wod$3.$$arity = -3), nil) && 'roll_wod';
  })($nesting[0], $$($nesting, 'DiceBot'), $nesting)
})(Opal);